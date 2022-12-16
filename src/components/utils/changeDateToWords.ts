export function changeDateToWords(date: string) {
    date = date.split('T')[0]

    let year = date.split('-')[0]

    let month = ''

    switch (date.split('-')[1]) {
        case '01':
            month = 'янв,'
            break
        case '02':
            month = 'фев,'
            break
        case '03':
            month = 'мар,'
            break
        case '04':
            month = 'апр,'
            break
        case '05':
            month = 'май,'
            break
        case '06':
            month = 'июн,'
            break
        case '07':
            month = 'июл,'
            break
        case '08':
            month = 'авг,'
            break
        case '09':
            month = 'сен,'
            break
        case '10':
            month = 'окт,'
            break
        case '11':
            month = 'ноя,'
            break
        case '12':
            month = 'дек,'
            break
    }

    return `${date.split('-')[2]} ${month} ${year}`
}