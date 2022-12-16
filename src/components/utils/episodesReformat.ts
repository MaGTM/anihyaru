import {IAnimeDescription} from "../../models/IAnime";

export const episodesReformat = (data: IAnimeDescription | undefined)=> {
    let episodes: number | string = 0
    if (data) {
        if (data.episodes === 0 && data.episodes_aired !== data.episodes) {
            episodes = data.episodes_aired
        }
        if (data.episodes_aired === 0 && data.episodes_aired !== data.episodes) {
            episodes = data.episodes
        }

        if (data.episodes !== data.episodes_aired && data.episodes_aired !== 0 && data.episodes !== 0) {
            episodes = `${data.episodes_aired} / ${data.episodes}`
        }

        if (data.episodes === data.episodes_aired) {
            episodes = data.episodes
        }

        if (data.episodes_aired > data.episodes && data.status !== 'ongoing') {
            episodes = data.episodes
        }

        if (data.episodes_aired > data.episodes && data.status === 'ongoing') {
            episodes = `${data.episodes_aired} / ?`
        }
    }

    return episodes
}