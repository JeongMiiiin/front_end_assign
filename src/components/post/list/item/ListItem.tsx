import postType from "@/type/PostType";

const PostListItem = ({item} : {item: postType}) => {
    return (
        <li>
            {item.postIdx}
            <img src={item.imagePath} alt={item.imageName} />
        </li>
    )
}

export default PostListItem;