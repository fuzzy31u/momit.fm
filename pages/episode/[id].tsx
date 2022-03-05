import xml2js from "xml2js";
import Footer from "../../components/Footer";
import Head from "../../components/Head";
import Header from "../../components/Header";
import { rssUrl } from "../../const";
import styles from '../../styles/Home.module.css'

interface RSS {
    params: {id: string}
    paths: {params: {id: string}}[]

    item: {
        title: string[]
        description: string[]
        enclosure: any[]
    }
}

export async function getStaticPaths() {    
    const res = await fetch(rssUrl);
    const text = await res.text()
    let parser = new xml2js.Parser();  
    let item = [];
    parser.parseString(text, (err, r) => {
        if (err) {
            console.error(err);
            return;
        }
        item = r.rss.channel[0].item;
    })

    let paths:RSS["paths"] = item.map((e, i: number)=>{
        return {params: {id: (i+1).toString()}}
    });
    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({params}) {
    const items:RSS["item"][] = await fetchRSS()
    const id:number = params["id"]
    const item:RSS["item"] = items.reverse()[id-1]
    return {
        props: {
            item
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

export default function Episode({item}){
    // const d = new Date(item.pubDate).toISOString().split('T')[0]
    const d = new Date(item.pubDate)
    const month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    const fmtDate = [year, month, day].join("/");

    return (
            <>
                <Head></Head>
                <Header></Header>
                <article className={styles.main}>
                    <h2>{item.title}</h2>
                    <p className={styles.detail_date}>{fmtDate}</p>
                    <audio className={styles.main_audio} controls src={item.enclosure[0]["$"]["url"]}></audio>
                    <div className={styles.main_description} dangerouslySetInnerHTML={{__html: item["description"][0]}}></div>
                </article>
                <Footer></Footer>
            </>
    );
}