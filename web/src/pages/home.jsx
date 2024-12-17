import { PageLayout } from "../components/layouts";
import { NewList } from "../components/news/new-list/new-list";

function Home () {
    return(
        <PageLayout>
            <NewList />
        </PageLayout>
    )
}
export default Home;