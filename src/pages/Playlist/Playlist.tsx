import { FC, useCallback, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import "./playlist.scss";
import { Pagination, Table } from "../../components/UI";
import {
  SelectField,
  SelectFieldFetchOptionsFunction,
} from "../../components/Form";
import { BASE_URL } from "../../utils/constants";
import { Order, PlaylistTableField, RowsPerPage } from "../../utils/enums";
import { OnRowsPerPageChangeFunction } from "../../components/UI/Pagination/RowsPerPageSelector";
import { IColumn, ISelectFieldOption, TableSort } from "../../utils/interfaces";
import {
  SelectFieldChangeFunction,
  TableSortFunction,
} from "../../utils/types";
import { sign } from "crypto";

interface IRow {
  singer: string;
  song: string;
  genre: string;
  year: number;
}

const columns: IColumn<IRow>[] = [
  {
    field: PlaylistTableField.singer,
    title: "Singer",
    width: "25%",
  },
  {
    field: PlaylistTableField.song,
    title: "Song",
    width: "25%",
  },
  {
    field: PlaylistTableField.genre,
    title: "Genre",
    width: "25%",
  },
  {
    field: PlaylistTableField.year,
    title: "Year",
    width: "25%",
  },
];

export type FilterList = "singers" | "genres";

const Playlist: FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  // FILTER
  const [filter, setFilter] = useState<Record<string, ISelectFieldOption>>({
    singer: { id: -1, name: "All" },
    genre: { id: -1, name: "All" },
    year: { id: -1, name: "All" },
  });

  const fetchList: SelectFieldFetchOptionsFunction<FilterList> = async (
    endpoint: FilterList,
    search?: string
  ) => {
    let url = `${BASE_URL}/api/${endpoint}`;

    let sign: "?" | "&" = "?";

    if (search) {
      url += `${sign}search=${search}`;
      sign = "&";
    }

    if (filter.singer.id > 0) {
      url += `${sign}singer=${filter.singer.id}`;
      sign = "&";
    }

    if (filter.year.id > 0) {
      url += `${sign}year=${filter.year.id}`;
    }

    try {
      const res = await axios.get(url);
      const { list } = res.data;

      console.log({ list });
      return [list, null];
    } catch (error) {
      if (error instanceof AxiosError || error instanceof Error) {
        console.log("ERROR: ", error.message);
        return [[], error.message];
      }

      return [[], "Something went wrong!"];
    }
  };

  // SORT
  const [sort, setSort] = useState<TableSort<PlaylistTableField>>({
    field: PlaylistTableField.singer,
    order: Order.none,
  });
  // PAGINATION
  const [rowsPerPage, setRowsPerPage] = useState(RowsPerPage.ten);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [itemsOffset, setItemsOffset] = useState(0);
  const [playlist, setPlaylist] = useState<IRow[]>([]);
  const [total, setTotal] = useState(0);

  // FETCH PLAYLIST
  const fetchPlaylist = useCallback(async () => {
    setIsLoading(true);

    let url = `${BASE_URL}/api/playlist?limit=${rowsPerPage}&offset=${itemsOffset}`;

    if (sort.order !== Order.none) {
      url += `&sort=${sort.field}&order=${sort.order}`;
    }

    let filterQuery = "";
    Object.entries(filter).forEach(([field, value]) => {
      console.log(field);
      if (value.id !== -1) {
        filterQuery += `&${field}=${value.id}`;
      }
    });
    url += filterQuery;

    try {
      const response = await axios.get(url);
      if (response.status !== 200) {
        console.log("ERROR");
        throw new Error(response.data);
      }

      const { data } = response;
      console.log({ data });

      setPlaylist(data.playlist);
      setTotal(data.total);

      const pageCount = Math.ceil(data.total / rowsPerPage); // 100 / 10 = 10
      setPageCount(pageCount);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("ERROR: ", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [rowsPerPage, itemsOffset, sort, filter]);

  useEffect(() => {
    fetchPlaylist();
  }, [fetchPlaylist]);

  // PAGINATION
  const handlePageClick = (newPage: number) => {
    setCurrentPage(newPage);
    updateOffset(newPage, rowsPerPage);
  };
  const nextPage = () => {
    if (currentPage === pageCount) return;
    setCurrentPage((prev) => prev + 1);
    updateOffset(currentPage + 1, rowsPerPage);
  };
  const prevPage = () => {
    if (currentPage === 1) return;
    setCurrentPage((prev) => prev - 1);
    updateOffset(currentPage - 1, rowsPerPage);
  };
  const onRowsPerPageChange: OnRowsPerPageChangeFunction = (
    newRowsPerPage: RowsPerPage
  ) => {
    setRowsPerPage(newRowsPerPage);

    const newPageCount = Math.ceil(total / newRowsPerPage);
    setPageCount(pageCount);

    const newCurrentPage = Math.min(newPageCount, currentPage);
    setCurrentPage(newCurrentPage);

    updateOffset(newCurrentPage, newRowsPerPage);
  };
  function updateOffset(page: number, rowsPerPage: RowsPerPage) {
    const newOffset = ((page - 1) * rowsPerPage) % total;
    setItemsOffset(newOffset);
    console.log(
      `Page number: ${page}, Limit: ${rowsPerPage}, Offset ${newOffset}`
    );
  }

  // SORT
  const handleSort: TableSortFunction<PlaylistTableField> = (
    newSort: TableSort<PlaylistTableField>
  ) => {
    setSort(newSort);
  };

  // FILTER
  const handleFilterChange: SelectFieldChangeFunction = (
    field: string,
    selectedOption: ISelectFieldOption
  ) => {
    console.log(selectedOption);
    setFilter((prev) => ({ ...prev, [field]: selectedOption }));
  };

  // LOADING
  if (isLoading)
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          fontSize: "3em",
          fontWeight: 600,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading...
      </div>
    );

  return (
    <div className="page playlist-page">
      <h1 className="page__title">Playlist Page</h1>
      <div className="playlist-page__content">
        <div className="playlist-table">
          <h3 className="playlist-table__title">Playlist</h3>
          <Table<IRow, PlaylistTableField>
            rows={playlist}
            columns={columns}
            sort={sort}
            onSort={handleSort}
          />
          <Pagination
            pageCount={pageCount}
            currentPage={currentPage}
            onPageChange={handlePageClick}
            prevPage={prevPage}
            nextPage={nextPage}
            onRowsPerPageChange={onRowsPerPageChange}
            rowsPerPage={rowsPerPage}
          />
        </div>

        <div className="filter">
          <h3 className="filter__title">Filter</h3>

          <form className="filter__form">
            <SelectField<FilterList>
              field="singer"
              label="Singer"
              onChange={handleFilterChange}
              value={filter["singer"]}
              fetchOptions={fetchList}
              endpoint="singers"
            />
            <SelectField
              field="genre"
              label="Genre"
              onChange={handleFilterChange}
              value={filter["genre"]}
              fetchOptions={fetchList}
              endpoint="genres"
            />
            <SelectField
              field="year"
              label="Year"
              onChange={handleFilterChange}
              value={filter["year"]}
              fetchOptions={fetchList}
              endpoint="singers"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
