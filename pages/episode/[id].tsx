import xml2js from "xml2js";
import { useRef } from "react";
import Footer from "../../components/Footer";
import Head from "../../components/Head";
import Header from "../../components/Header";
import Transcript from "../../components/Transcript";
import { rssUrl } from "../../const";
import styles from '../../styles/Home.module.css'
import { formatDate } from "../../util";
import fs from "fs";
import path from "path";

export async function getStaticPaths() {
    const res = await fetch(rssUrl);
    const text = await res.text()
    let parser = new xml2js.Parser();
    let item = [];
    parser.parseString(text, (err: any, r: { rss: { channel: { item: any[]; }[]; }; }) => {
        if (err) {
            console.error(err);
            return;
        }
        item = r.rss.channel[0].item;
    })

    let paths: main.RSS["paths"] = item.map((e, i: number) => {
        return { params: { id: (i + 1).toString() } }
    });
    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    const items: main.RSS["item"][] = await fetchRSS()
    const id: number = params["id"]
    const item: main.RSS["item"] = items.reverse()[id - 1]

    // Try to load transcript if it exists
    let transcript: main.Transcript | null = null;
    try {
        const transcriptPath = path.join(process.cwd(), 'public', 'transcripts', `${id}.json`);
        if (fs.existsSync(transcriptPath)) {
            const transcriptData = fs.readFileSync(transcriptPath, 'utf-8');
            transcript = JSON.parse(transcriptData);
        }
    } catch (error) {
        console.log(`No transcript found for episode ${id}`);
    }

    return {
        props: {
            item,
            transcript
        }
    };
}

async function fetchRSS() {
    const res = await fetch(rssUrl);
    const text = await res.text()
    let parser = new xml2js.Parser();
    let item
    parser.parseString(text, (err, r) => {
        if (err) {
            console.error(err);
            return;
        }
        item = r.rss.channel[0].item;
    })
    return item;
}

export default function Episode({ item, transcript }) {
    const description = item["description"][0];
    const audioRef = useRef<HTMLAudioElement>(null);

    return (
        <>
            <Head title={item.title} description={description}></Head>
            <Header></Header>
            <article className={styles.main}>
                <h2 className={styles.main_title}>{item.title}</h2>
                <p className={styles.detail_date}>{formatDate(item.pubDate)}</p>
                <audio
                    ref={audioRef}
                    className={styles.main_audio}
                    controls
                    src={item.enclosure[0]["$"]["url"]}
                ></audio>
                <div className={styles.main_description} dangerouslySetInnerHTML={{ __html: description }}></div>
                {transcript && (
                    <Transcript segments={transcript.segments} audioRef={audioRef} />
                )}
            </article>
            <Footer></Footer>
        </>
    );
}