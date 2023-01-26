import { FC, useCallback, useEffect, useState } from "react";
import axios from "axios";

import "./playlist.scss";
import { ErrorComponent, Loader, Pagination, Table } from "../../components/UI";
import {
  SelectField,
  SelectFieldFetchOptionsFunction,
} from "../../components/Form";
import { BASE_URL } from "../../utils/constants";
import {
  Order,
  PlaylistFilterEndpoint,
  PlaylistTableField,
  RowsPerPage,
} from "../../utils/enums";
import { OnRowsPerPageChangeFunction } from "../../components/UI/Pagination/RowsPerPageSelector";
import {
  IColumn,
  IPlaylistTableRow,
  ISelectFieldOption,
  TableSort,
} from "../../utils/interfaces";
import {
  SelectFieldChangeFunction,
  TableSortFunction,
  TSelectFieldOption,
} from "../../utils/types";
import { isSelectFieldOptionWithId } from "../../utils/functions";
import { ResetButton } from "../../components/Buttons";
import {
  createSearchParams,
  URLSearchParamsInit,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const columns: IColumn<IPlaylistTableRow>[] = [
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

const Playlist: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // FILTER
  const [filter, setFilter] = useState<Record<string, TSelectFieldOption>>({
    singer: { id: -1, name: "" },
    genre: { id: -1, name: "" },
    year: { name: "" },
  });

  const fetchList: SelectFieldFetchOptionsFunction<
    PlaylistFilterEndpoint
  > = async (endpoint: PlaylistFilterEndpoint, search?: string) => {
    let url = `${BASE_URL}/api/${endpoint}`;

    let sign: "?" | "&" = "?";

    if (search) {
      url += `${sign}search=${search}`;
      sign = "&";
    }

    if (
      isSelectFieldOptionWithId(filter.singer) &&
      filter.singer.id > 0 &&
      endpoint !== PlaylistFilterEndpoint.singers
    ) {
      url += `${sign}singer=${filter.singer.id}`;
      sign = "&";
    }

    if (
      isSelectFieldOptionWithId(filter.genre) &&
      filter.genre.id > 0 &&
      endpoint !== PlaylistFilterEndpoint.genres
    ) {
      url += `${sign}genre=${filter.genre.id}`;
      sign = "&";
    }

    if (filter.year.name && endpoint !== PlaylistFilterEndpoint.years) {
      url += `${sign}year=${filter.year.name}`;
    }

    try {
      const res = await axios.get(url);
      const { list } = res.data;

      return [list, null];
    } catch (error) {
      if (error instanceof Error) {
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
  const [playlist, setPlaylist] = useState<IPlaylistTableRow[]>([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  // FETCH PLAYLIST

  const fetchPlaylist = useCallback(async () => {
    setIsLoading(true);

    const url = `${BASE_URL}/api/playlist`;

    const query: URLSearchParamsInit = {
      limit: String(rowsPerPage),
      offset: String(itemsOffset),
    };

    if (sort.order !== Order.none) {
      query["sort"] = sort.field;
      query["order"] = sort.order;
    }

    Object.entries(filter).forEach(([field, value]) => {
      if (value.name !== "") {
        const queryValue = isSelectFieldOptionWithId(value)
          ? value.id
          : value.name;
        query[field] = String(queryValue);
      }
    });

    try {
      const search = createSearchParams(query).toString();
      const response = await axios.get(url + `?${search}`);

      const { data } = response;

      setPlaylist(data.playlist);
      setTotal(data.total);

      const pageCount = Math.ceil(data.total / rowsPerPage);
      setPageCount(pageCount);

      const options = {
        search,
      };

      navigate(options, { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }

      setError("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }, [rowsPerPage, itemsOffset, sort, filter, navigate]);

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
    handlePageClick(1);
    setFilter((prev) => ({ ...prev, [field]: selectedOption }));
  };
  const resetFilter = () => {
    setFilter({
      singer: { id: -1, name: "" },
      genre: { id: -1, name: "" },
      year: { name: "" },
    });
  };

  // LOADING
  if (isLoading) return <Loader />;

  if (error) {
    return <ErrorComponent message={error} />;
  }

  return (
    <div className="page playlist-page">
      <h1 className="page__title">Playlist Page</h1>
      <div className="playlist-page__content">
        <div className="playlist-table">
          <Table<IPlaylistTableRow, PlaylistTableField>
            total={total}
            rows={playlist}
            columns={columns}
            sort={sort}
            onSort={handleSort}
            refetchTable={fetchPlaylist}
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
            <SelectField<PlaylistFilterEndpoint>
              field="singer"
              label="Singer"
              onChange={handleFilterChange}
              value={filter["singer"]}
              fetchOptions={fetchList}
              endpoint={PlaylistFilterEndpoint.singers}
            />
            <SelectField
              field="genre"
              label="Genre"
              onChange={handleFilterChange}
              value={filter["genre"]}
              fetchOptions={fetchList}
              endpoint={PlaylistFilterEndpoint.genres}
            />
            <SelectField
              field="year"
              label="Year"
              onChange={handleFilterChange}
              value={filter["year"]}
              fetchOptions={fetchList}
              endpoint={PlaylistFilterEndpoint.years}
            />
            <ResetButton
              onClick={resetFilter}
              type="button"
              disabled={Object.values(filter).every((field) => !field.name)}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
