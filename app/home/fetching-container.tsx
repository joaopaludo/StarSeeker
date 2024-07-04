"use client";

import ArticleTable from "./article-table";
import CalendarTable from "./calender-table";
import TableWidget from "./table-widget";

const FetchingContainer = () => {
    return (
        <div className="home__content">
            <CalendarTable />

            <ArticleTable />
        </div>
    );
};

export default FetchingContainer;
