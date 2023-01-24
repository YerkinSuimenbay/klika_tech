import { FC, useEffect, useState } from "react";
import "./playlist.scss";
import { IColumn, Pagination, Table } from "../../components/UI";
import { SelectField } from "../../components/Form";
import { ItemsPerPageEnum } from "../../components/UI/Pagination/ItemsPerPageSelector";

interface IRow {
  fullName: string;
  role: string;
  tags: string[];
}

const columns: IColumn<IRow>[] = [
  {
    key: "fullName",
    title: "Full Name",
    width: 200,
  },
  {
    key: "role",
    title: "Role",
    width: 200,
  },
  {
    key: "tags",
    title: "Tags",
    width: 200,
    render: (_, { tags }) => (
      <>
        {tags.map((tag, tagIndex) => (
          <span key={`tag-${tagIndex}`} style={{ marginLeft: tagIndex * 4 }}>
            {tag}
          </span>
        ))}
      </>
    ),
  },
];

const rows: IRow[] = [
  {
    fullName: "Francisco Mendes",
    role: "Full Stack",
    tags: ["dev", "blogger"],
  },
  {
    fullName: "Ricardo Malva",
    role: "Social Media Manager",
    tags: ["designer", "photographer"],
  },
];

const Playlist: FC = () => {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  const [itemsPerPage, setItemsPerPage] = useState<ItemsPerPageEnum>(
    ItemsPerPageEnum.ten
  );

  useEffect(() => {
    // fetch playlist
    /*
    len = playlist.length


    */

    const totalItem = 100;
    const itemsPerPage = ItemsPerPageEnum.ten;
    const pageCount = Math.ceil(totalItem / itemsPerPage); // 100 / 10 = 10
    const itemOffset = 0;
    const endOffset = itemOffset + itemsPerPage; // FETCH FROM itemOffset to endOffset
  }, []);

  const handlePageClick = (newPage: number) => {
    const totalItem = 100;

    const newOffset = ((newPage - 1) * itemsPerPage) % totalItem;
    console.log(
      `User requested page number ${newPage}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div className="page playlist-page">
      <h1 className="page__title">Playlist Page</h1>
      <div className="playlist-page__content">
        <div className="playlist-table">
          <h3 className="playlist-table__title">Playlist</h3>
          <Table rows={rows} columns={columns} />
          <Pagination
            pageCount={10}
            currentPage={9}
            onPageChange={handlePageClick}
          />
        </div>

        <div className="filter">
          <h3 className="filter__title">Filter</h3>

          <form className="filter__form">
            <SelectField
              label="Singer"
              // value={{ id: 1, value: "val" }}
              options={[
                { id: -1, value: "All" },

                { id: 1, value: "val" },
                { id: 2, value: "val 2" },
              ]}
            />
            <SelectField
              label="Genre"
              // value={{ id: 1, value: "val" }}
              options={[
                { id: -1, value: "All" },
                { id: 1, value: "val" },
                { id: 2, value: "val 2" },
              ]}
            />
            <SelectField
              label="Year"
              // value={{ id: 1, value: "val" }}
              options={[
                { id: -1, value: "All" },

                { id: 1, value: "val" },
                { id: 2, value: "val 2" },
              ]}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
