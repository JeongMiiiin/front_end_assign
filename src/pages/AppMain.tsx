import Header from "@/components/inc/Header";
import PostList from "@/components/post/list/List";
import PageStyle from '@/resources/css/page/AppMain.module.css';

const AppMain = () => {
    return (
        <div className="col-12">
            <Header />
            <PostList />
        </div>
    )
}

export default AppMain;