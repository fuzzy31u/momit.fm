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
}