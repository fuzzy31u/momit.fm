declare namespace main {
    interface RSS {
        params: { id: string }
        paths: { params: { id: string } }[]

        item: {
            title: string[]
            description: string[]
            enclosure: any[]
        }
    }

    interface TranscriptSegment {
        speaker: string
        timestamp: string
        text: string
    }

    interface Transcript {
        episodeId: number
        segments: TranscriptSegment[]
    }
}