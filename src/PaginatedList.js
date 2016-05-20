
import Paginator from './Paginator';

/**
 * Provides an easy API to for paginating a list of data(array).
 *
 * @author Kabir Baidhya
 */
class PaginatedList {

    constructor(data) {
        this.data = data || [];
        this.paginator = new Paginator(data);
    }

    paginate(page, maxRows) {
        this.paginator.setMaxRows(maxRows);

        if (this.paginator.noOfPages() === 0) {
            return [];
        }

        this.paginator.setPage(page);

        return {
            currentPage: page,
            maxRows: maxRows,
            links: this.paginator.links(),
            total: this.paginator.total(),
            results: this.paginator.results(),
            noOfPages: this.paginator.noOfPages(),
        };
    }

    all() {
        return data;
    }

    count() {
        return data.length;
    }
}

export default PaginatedList;
