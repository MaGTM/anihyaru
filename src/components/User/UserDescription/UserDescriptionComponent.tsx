import React, {FC, useCallback, useState} from 'react';
import s from './UserDescriptionComponent.module.css'
import {userAPI} from "../../../store/services/userService";
import Cropper, {Area} from "react-easy-crop";
import getCroppedImg from "../../utils/cropImage";
import {useAppDispatch} from "../../../hooks/redux";
import {logout, setUserAvatar} from "../../../store/reducers/userReducer";
import {IUserComponent} from "../../../models/IUser";
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";

const UserDescriptionComponent: FC<IUserComponent> = ({user}) => {
    let [description, setDescription] = useState(user.description)
    let [updateDescription] = userAPI.useChangeDescriptionMutation() // isLoading: isDescriptionLoading, isError: isDescriptionError
    // let [uploadAvatar] = userAPI.useUploadAvatarMutation() // isLoading: isAvatarLoading, isError: IsAvatarError
    let dispatch = useAppDispatch()
    let cookies = new Cookies()
    let navigate = useNavigate()

    const [image, setImage] = useState<any>()
    const [croppedArea, setCroppedArea] = useState<Area>();
    const [crop, setCrop] = useState({x: 0, y: 0});
    const [zoom, setZoom] = useState(1);

    const [croppedImage, setCroppedImage] = useState(user.avatar)

    let roleTranslate = ''
    switch (user.role) {
        case 'USER':
            roleTranslate = 'Пользователь'
            break
        case 'ADMIN':
            roleTranslate = 'Администратор'
            break
        case 'MODERATOR':
            roleTranslate = 'Редактор'
            break
    }

    let submitDescription = () => {
        updateDescription(description)
    }

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.addEventListener("load", () => {
                setImage(reader.result);
            });
        }
    };

    const onCropComplete = useCallback(
        (croppedArea: Area, croppedAreaPixels: Area) => {
            setCroppedArea(croppedAreaPixels);
        },
        []
    );

    const changeOpen = () => {
        setImage(null)
    }

    let showCroppedImage = async (e: React.MouseEvent) => {
        e.stopPropagation()
        setImage(null)
        const {file, url} = await getCroppedImg(
            image,
            croppedArea,
        )
        let newAvatar = new FormData()
        newAvatar.append("file", file)
        setCroppedImage(url)
        dispatch(setUserAvatar(url))
        // uploadAvatar(newAvatar)
    }

    let logoutHandler = useCallback(() => {
        dispatch(logout())
        cookies.remove('token')
        navigate('/')
    }, [])

    return (
        <div className={s.content}>
            <div className={s.avatarBlock}>
                {croppedImage ? <img src={croppedImage} alt=""/> : <span className={s.noAvatar}>{user.login.split('')[0]}</span>}
                <label htmlFor="fileInput">
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="25" cy="25" r="25" fill="#FFBA35"/>
                        <g clipPath="url(#clip0_39_142)">
                            <path
                                d="M17.5001 39.8521H32.3529C36.8822 39.8521 40.5672 36.1671 40.5672 31.6379V16.7864C40.5672 12.2571 36.8822 8.57214 32.3529 8.57214H17.5001C12.9708 8.57214 9.28577 12.2571 9.28577 16.7864V31.6386C9.28577 36.1671 12.9708 39.8521 17.5001 39.8521ZM11.4286 16.7864C11.4286 13.4386 14.1522 10.715 17.5001 10.715H32.3529C35.7008 10.715 38.4243 13.4386 38.4243 16.7864V31.6386C38.4243 34.9864 35.7008 37.71 32.3529 37.71H17.5001C14.1522 37.71 11.4286 34.9864 11.4286 31.6386V16.7864Z"
                                fill="white"/>
                            <path
                                d="M18.0208 33.4979H31.9579C34.5179 33.4979 36.6008 31.5086 36.6008 29.0629C36.6008 26.5321 35.8951 24.5314 34.5015 23.1157L31.7722 20.3521C30.0094 18.5593 27.7122 18.5171 25.8958 20.2607L22.9579 23.1093C22.4829 23.5657 22.0451 24.0821 21.6579 24.5393C21.3572 24.8936 20.9329 25.3943 20.6579 25.63C20.5936 25.5814 20.5244 25.5279 20.4529 25.4729C19.1979 24.51 17.9758 23.6457 16.8115 23.6457C16.3408 23.6457 15.9094 23.7936 15.5651 24.0729C14.3186 25.0836 13.3779 27.3693 13.3779 29.3907C13.3779 31.6557 15.4608 33.4979 18.0208 33.4979ZM16.8515 25.7914C17.4072 25.8386 18.6665 26.8043 19.1479 27.1736C19.3515 27.33 19.5301 27.4664 19.6722 27.5671C19.9551 27.7664 20.2822 27.8721 20.6194 27.8721C21.6429 27.8714 22.4072 26.9693 23.2922 25.925C23.6629 25.4879 24.0458 25.0357 24.4451 24.6521L27.3829 21.8036C28.3744 20.8521 29.2722 20.8671 30.2451 21.8564L32.9744 24.62C33.9579 25.62 34.4565 27.115 34.4565 29.0636C34.4565 30.3279 33.3351 31.3557 31.9565 31.3557H18.0208C16.6422 31.3557 15.5208 30.475 15.5208 29.3914C15.5208 27.9493 16.2101 26.3736 16.8515 25.7914Z"
                                fill="white"/>
                            <path
                                d="M19.8144 21.9464C21.2318 21.9464 22.3808 20.7974 22.3808 19.38C22.3808 17.9626 21.2318 16.8136 19.8144 16.8136C18.397 16.8136 17.2479 17.9626 17.2479 19.38C17.2479 20.7974 18.397 21.9464 19.8144 21.9464Z"
                                fill="white"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_39_142">
                                <rect width="31.2814" height="31.2814" fill="white"
                                      transform="translate(9.28577 8.57143)"/>
                            </clipPath>
                        </defs>
                    </svg>
                </label>
                <input type="file" id="fileInput" accept={"image/*"} onChange={onSelectFile}/>
            </div>
            <div className={s.usernameBlock}>
                <h1>{user.login}</h1>
                <p>{roleTranslate}</p>
            </div>
            <div className={s.userDescriptionBlock}>
                <textarea
                    placeholder={'Напишите о чем-нибудь'} value={description}
                    onChange={(e) => setDescription(e.target.value)} onBlur={submitDescription}
                    maxLength={188}
                    spellCheck="false"
                />
            </div>
            <div className={s.logoutBlock}>
                <button onClick={logoutHandler}>Выход</button>
            </div>
            {image &&
                <div className={s.cropperContainer} onClick={changeOpen}>
                    <div className={s.cropper} onClick={(e) => e.stopPropagation()}>
                        <Cropper
                            image={image}
                            showGrid={false}
                            crop={crop}
                            aspect={1}
                            zoom={zoom}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                            cropShape={"round"}
                            cropSize={{ width: 160, height: 160 }}
                        />
                    </div>
                    <button onClick={showCroppedImage}>Изменить</button>
                </div>
            }
        </div>
    );
};

export default UserDescriptionComponent;