import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { VscNewFile } from "react-icons/vsc";

const UploadImage = ({ title, uploadImage }: { title: File | undefined; uploadImage: Dispatch<SetStateAction<File | undefined>> }) => {
    console.log(title);
    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col items-center justify-center w-32 h-32 rounded-full  bg-white mx-auto">
                <label htmlFor="upload-image">upload image
                    <VscNewFile />
                </label>
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="upload-image"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        if (e.currentTarget.files && e.currentTarget.files[0]) {
                            uploadImage(e.currentTarget.files[0]);
                        }
                    }}
                />
            </div>
            <small>{title?.name}</small>
        </div>
    );
}

export default UploadImage;