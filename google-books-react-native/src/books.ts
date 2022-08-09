export class BookCreateDto {
    constructor(
        public title: string,
        public content: string,
        public imageUrl: string,
        public authors: string
    ) {}
}

export class Books extends BookCreateDto {
    constructor(
        public id: string,
        title: string,
        content: string,
        imageUrl: string,
        authors: string
    ) {
        super( title,content,imageUrl,authors)
    }
}