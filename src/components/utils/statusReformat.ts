import {IAnimeDescription} from "../../models/IAnime";

export const statusReformat = (data: IAnimeDescription | undefined, classes: [released: string, ongoing: string, anons: string]): {status: string, statusClass: string}  => {
    let status = ''
    let statusClass = ''
    switch (data?.status) {
        case 'released':
            status = 'Вышел'
            statusClass = classes[0]
            break
        case 'ongoing':
            status = 'Онгоинг'
            statusClass = classes[1]
            break
        case 'anons':
            status = 'Анонсирован'
            statusClass = classes[2]
            break
    }

    return {status, statusClass}
}