import Link from "next/link";
import { FC, Fragment } from "react";

type TableWidgetItem = {
    title: string;
    description: string;
    siteName?: string;
    date: string;
};

interface TableWidgetProps {
    title: string;

    items: TableWidgetItem[];

    linkTo: string;
    linkToText: string;
}

const TableWidget: FC<TableWidgetProps> = ({
    title,
    linkToText,
    linkTo,
    items,
}) => {
    return (
        <div className="table-widget glass">
            <h4 className="h-xs">{title}</h4>

            <div className="table-widget__container">
                {items.splice(0, 3).map((item, index) => (
                    <Fragment key={index}>
                        <div className="table-widget__item">
                            <div className="table-widget__item-text">
                                <h5 className="h-s">{item.title}</h5>
                                <p className="p-m">{item.description}</p>
                            </div>

                            <div className="table-widget__item-links p-m">
                                <div className="site-link">{item.siteName}</div>

                                <div className="date">{item.date}</div>
                            </div>
                        </div>

                        {index !== items.length - 1 && <hr />}
                    </Fragment>
                ))}
            </div>

            <div className="table__widget-link-to">
                <Link href={linkTo}>{linkToText}</Link>
            </div>
        </div>
    );
};

export default TableWidget;
