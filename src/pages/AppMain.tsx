import Header from "@/components/inc/Header";
import PostList from "@/components/post/list/List";
import pageStyle from '@/resources/css/page/AppMain.Module.css';

const AppMain = () => {
    return (
        <div className="col-12">
            <Header />
            <PostList />
        </div>
    )
}

export default AppMain;