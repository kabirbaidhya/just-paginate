/**
 * A Paginator class that is responsible for Paginating an array of all records
 *
 *  Usage:
 *      let paginator = new Paginator(allRecords);
 *      paginator.setMaxRows(maxRows);
 *
 *      // Get total records
 *      let total = paginator.total();
 *
 *      // Get no of pages
 *      let noOfPages = paginator.noOfPages();
 *
 *      // Pagination links for page 1
 *      let links = paginator.setPage(1).links();
 *
 *      // Records for page 2
 *      let results = paginator.setPage(2).results();
 *
 * @author Kabir Baidhya
 */
class Paginator {

    constructor(data) {
        this.data = data || [];
        this.currentPage = null;
        this.maxRows = null;
    }

    availablePages() {
        let pages = [];

        for (let page = 1; page <= this.noOfPages(); page++) {
            pages.push(page);
        }

        return pages;
    }

    hasPrevious() {
        return this.currentPage > 1;
    }

    hasNext() {
        return this.currentPage < this.noOfPages();
    }

    setPage(value) {
        if (!isPositiveInt(value)) {
            throw new Error('Page number should be a positive integers(greater than zero)');
        }

        if (value > this.noOfPages()) {
            throw new Error('Current Page should not be greater than the total number of pages');
        }

        thils.currentPage = parseInt(value);

        return this;
    }

    setMaxRows(value) {
        if (!isPositiveInt(value)) {
            throw new Error('Maximum rows should be a positive integer (greater than zero)');
        }

        this.maxRows = parseInt(value);

        return this;
    }

    results() {
        let {
            currentPage, maxRows, data
        } = this;
        let firstIndex = (currentPage - 1) * maxRows;
        let results = [];

        if (data.length > 0 && data[firstIndex]) {
            for (let i = firstIndex; i < (firstIndex + maxRows); i++) {
                if (!data[i]) {
                    break;
                }

                results.push(data[i]);
            }
        }

        return results;
    }

    noOfPages() {
        let {
            maxRows, total
        } = this;

        if (!isPositiveInt(maxRows)) {
            throw new Error('Maximum number of rows not set.');
        }

        return Math.ceil(total() / maxRows);
    };

    total() {
        return this.data.length;
    }

    links() {
        let links = {};

        links.pages = this.availablePages();

        if (this.hasPrevious()) {
            links.prev = this.currentPage - 1;
        }

        if (this.hasNext()) {
            links.next = this.currentPage + 1;
        }

        return links;
    }
}

function isPositiveInt(value) {
    return !isNaN(value) && value > 0;
}

export default Paginator;
