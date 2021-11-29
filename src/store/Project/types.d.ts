interface IProject {
    author: string;
    customer: string;
    title: string;
    done: string;
    year: number;
    images: string[];
    tags: string[];
    slug: string;
    createdAt: string;
    updatedAt: string;
}

interface IEditProject {
    id: string;
    data: FormData | ISendProjectData;
}

interface ISendProjectData {
    customer?: string;
    title?: string;
    done?: string;
    year?: number;
    photoes: string[];
    tags?: string[];
    slug?: string;
}