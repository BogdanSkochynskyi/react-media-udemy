import {useAddPhotoMutation, useFetchPhotosQuery} from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import PhotosListItem from "./PhotosListItem";

function PhotosList({album}) {

    const {data, error, isLoading} = useFetchPhotosQuery(album);

    let content;
    if (isLoading) {
        content = <Skeleton className="h-8 w-8" times={1}/>
    } else if (error) {
        content = <div>Error</div>
    } else {
        content = data.map(photo => {
            return <PhotosListItem key={album.id} photo={photo}/>
        });
    }

    const [addPhoto, results] = useAddPhotoMutation();

    const handleAddPhoto = () => {
        addPhoto(album);
    }

    return (
        <div>
            <div className="m-2 flex flex-row items-center justify-between">
                <h3 className="text-lg font-bold">Photos in {album.name}</h3>
                <Button onClick={handleAddPhoto} loading={results.isLoading}>
                    + add photo
                </Button>
            </div>
            <div className="mx-8 flex flex-row flex-wrap justify-center">
                {content}
            </div>
        </div>
    );
}

export default PhotosList;
