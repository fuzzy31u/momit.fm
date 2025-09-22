const fs = require('fs');
const https = require('https');

// Check if Playwright is available (in GitHub Actions environment)
let playwright;
try {
  playwright = require('playwright');
} catch (error) {
  console.log('Playwright not available, using fallback HTTP requests');
}

function fetchRSSFeed() {
  return new Promise((resolve, reject) => {
    https.get('https://rss.art19.com/momitfm', (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}


function fetchWebPage(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.protocol === 'https:' ? 443 : 80,
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    };

    const protocol = urlObj.protocol === 'https:' ? https : require('http');
    
    const req = protocol.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
        }
      });
    });

    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.abort();
      reject(new Error('Request timeout'));
    });
    req.end();
  });
}

async function fetchPageWithPlaywright(url) {
  if (!playwright) {
    throw new Error('Playwright not available');
  }
  
  console.log(`Using Playwright to fetch: ${url}`);
  const browser = await playwright.chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto(url, { waitUntil: 'networkidle' });
    // Wait a bit more for dynamic content to load
    await page.waitForTimeout(3000);
    
    const content = await page.content();
    return content;
  } finally {
    await browser.close();
  }
}

async function extractEpisodeLinksWithLLM() {
  try {
    console.log('Crawling podcast show pages to find latest episode...');
    
    // URLs to crawl
    const spotifyShowUrl = 'https://open.spotify.com/show/5F2ppZb8gxJngLlO6wlIqX';
    const appleShowUrl = 'https://podcasts.apple.com/jp/podcast/momit-fm/id1589345170';
    
    let spotifyHtml, appleHtml;
    
    // Try Playwright first, fallback to HTTP
    try {
      if (playwright) {
        console.log('Using Playwright for full page rendering...');
        spotifyHtml = await fetchPageWithPlaywright(spotifyShowUrl);
        appleHtml = await fetchPageWithPlaywright(appleShowUrl);
      } else {
        throw new Error('Playwright not available');
      }
    } catch (playwrightError) {
      console.log('Playwright failed, using fallback HTTP requests...');
      spotifyHtml = await fetchWebPage(spotifyShowUrl);
      appleHtml = await fetchWebPage(appleShowUrl);
    }
    
    // Extract episode URLs using regex
    console.log('Extracting episode URLs from HTML...');
    
    // Look for Spotify episode URLs - try multiple patterns
    const spotifyEpisodeRegex1 = /https:\/\/open\.spotify\.com\/episode\/[a-zA-Z0-9]+/g;
    const spotifyEpisodeRegex2 = /\/episode\/([a-zA-Z0-9]+)/g;
    const spotifyEpisodeRegex3 = /"uri":"spotify:episode:([a-zA-Z0-9]+)"/g;
    
    let spotifyMatches = spotifyHtml.match(spotifyEpisodeRegex1);
    
    // Try alternative patterns for Playwright-rendered content
    if (!spotifyMatches) {
      const episodeIdMatches = spotifyHtml.match(spotifyEpisodeRegex2);
      if (episodeIdMatches) {
        spotifyMatches = episodeIdMatches.map(match => 
          `https://open.spotify.com${match}`
        );
      }
    }
    
    // Try URI format (common in Spotify's JSON data)
    if (!spotifyMatches) {
      const uriMatches = [...spotifyHtml.matchAll(spotifyEpisodeRegex3)];
      if (uriMatches.length > 0) {
        spotifyMatches = uriMatches.map(match => 
          `https://open.spotify.com/episode/${match[1]}`
        );
      }
    }
    
    // Look for Apple Podcast episode URLs
    const appleEpisodeRegex = /https:\/\/podcasts\.apple\.com\/[^"]*\?i=\d+/g;
    const appleMatches = appleHtml.match(appleEpisodeRegex);
    
    console.log('Found Spotify episodes:', spotifyMatches?.slice(0, 3) || 'none');
    console.log('Found Apple episodes:', appleMatches?.slice(0, 3) || 'none');
    
    // Use the first (likely latest) episodes found
    const spotifyEpisodeUrl = spotifyMatches ? spotifyMatches[0] : null;
    const appleEpisodeUrl = appleMatches ? appleMatches[0] : null;
    
    return {
      spotify: spotifyEpisodeUrl || spotifyShowUrl,
      apple: appleEpisodeUrl || appleShowUrl
    };
    
  } catch (error) {
    console.warn('Web crawling failed, falling back to show URLs:', error.message);
    return {
      spotify: 'https://open.spotify.com/show/5F2ppZb8gxJngLlO6wlIqX',
      apple: 'https://podcasts.apple.com/jp/podcast/momit-fm/id1589345170'
    };
  }
}


async function generateAnnouncement() {
  try {
    // Get episode details from command line arguments
    const episodeTitle = process.argv[2];
    const episodeNumber = process.argv[3];
    
    if (!episodeTitle || !episodeNumber) {
      console.error('Episode title and number are required');
      process.exit(1);
    }

    console.log('Fetching RSS feed to extract episode links...');
    
    // Fetch RSS feed and extract episode-specific links
    const rssContent = await fetchRSSFeed();
    const extractedLinks = await extractEpisodeLinksWithLLM();
    
    // Use extracted links with fallbacks to show URLs (more reliable)
    const spotifyUrl = extractedLinks.spotify || process.env.SPOTIFY_SHOW_URL || 'https://open.spotify.com/show/5F2ppZb8gxJngLlO6wlIqX';
    const applePodcastUrl = extractedLinks.apple || process.env.APPLE_PODCAST_URL || 'https://podcasts.apple.com/jp/podcast/momit-fm/id1589345170';
    
    console.log('Extracted Spotify URL:', spotifyUrl);
    console.log('Extracted Apple Podcast URL:', applePodcastUrl);

    // Create the announcement text following your template
    const announcementText = `IT企業で働くママによる子育て×Tech Podcast http://momit.fm を配信しました🎙️ w/
@m2vela

—
${episodeNumber}. ${episodeTitle}

👇Spotify
${spotifyUrl}

👇Apple
${applePodcastUrl}

#momitfm #子育テック`;

    console.log('\nGenerated announcement text:');
    console.log('='.repeat(50));
    console.log(announcementText);
    console.log('='.repeat(50));

    // Save to file
    fs.writeFileSync('announcement.txt', announcementText);
    console.log('\nAnnouncement text saved to announcement.txt');

  } catch (error) {
    console.error('Error generating announcement:', error);
    process.exit(1);
  }
}

generateAnnouncement();