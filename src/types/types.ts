export interface Task {
    name: string;
    done: boolean;
    category?: Category;
}

export enum Category {
    GENERAL = "general",
    WORK = "work",
    HOBBY = "hobby",
    SPORT = "sport",
    GYM = "gym",
    SCHOOL = "school"
}