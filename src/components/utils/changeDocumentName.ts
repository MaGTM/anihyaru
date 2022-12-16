export const changeDocumentName = (location: string) => {
    switch (location) {
        case '/':
            document.title = 'ANIHYARU'
            break
        case '/animelist':
            document.title = 'Список аниме | ANIHYARU'
            break
        case '/news':
            document.title = 'Новости из мира аниме | ANIHYARU'
            break
        case '/user':
            document.title = 'Личный кабинет | ANIHYARU'
            break
        case '/user/comments':
            document.title = 'Личный кабинет | ANIHYARU'
            break
    }
}