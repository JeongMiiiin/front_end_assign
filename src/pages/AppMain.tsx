import Header from "@/components/inc/Header";
import PostList from "@/components/post/list/List";
import PageStyle from '@/resources/css/page/AppMain.module.css';

const AppMain = () => {
    return (
        <div className="col-12 col-center mw-560 pl20 pr20 pl-md-30 pr-md-30 pt20 pb20 pt-md-50 pb-md-50">
            <Header />
            <PostList />
        </div>
    )
}

export default AppMain;