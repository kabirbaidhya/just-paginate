(function(e, a) { for(var i in a) e[i] = a[i]; }(window, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

	module.exports.Paginator = __webpack_require__(/*! ./lib/Paginator */ 1).default;
	module.exports.PaginatedList = __webpack_require__(/*! ./lib/PaginatedList */ 2).default;


/***/ },
/* 1 */
/*!**************************!*\
  !*** ./lib/Paginator.js ***!
  \**************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
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
	
	var Paginator = function () {
	    function Paginator(data) {
	        _classCallCheck(this, Paginator);
	
	        this.data = data || [];
	        this.currentPage = null;
	        this.maxRows = null;
	    }
	
	    _createClass(Paginator, [{
	        key: 'availablePages',
	        value: function availablePages() {
	            var pages = [];
	
	            for (var page = 1; page <= this.noOfPages(); page++) {
	                pages.push(page);
	            }
	
	            return pages;
	        }
	    }, {
	        key: 'hasPrevious',
	        value: function hasPrevious() {
	            return this.currentPage > 1;
	        }
	    }, {
	        key: 'hasNext',
	        value: function hasNext() {
	            return this.currentPage < this.noOfPages();
	        }
	    }, {
	        key: 'setPage',
	        value: function setPage(value) {
	            if (!isPositiveInt(value)) {
	                throw new Error('Page number should be a positive integers(greater than zero)');
	            }
	
	            if (value > this.noOfPages()) {
	                throw new Error('Current Page should not be greater than the total number of pages');
	            }
	
	            thils.currentPage = parseInt(value);
	
	            return this;
	        }
	    }, {
	        key: 'setMaxRows',
	        value: function setMaxRows(value) {
	            if (!isPositiveInt(value)) {
	                throw new Error('Maximum rows should be a positive integer (greater than zero)');
	            }
	
	            this.maxRows = parseInt(value);
	
	            return this;
	        }
	    }, {
	        key: 'results',
	        value: function results() {
	            var currentPage = this.currentPage;
	            var maxRows = this.maxRows;
	            var data = this.data;
	
	            var firstIndex = (currentPage - 1) * maxRows;
	            var results = [];
	
	            if (data.length > 0 && data[firstIndex]) {
	                for (var i = firstIndex; i < firstIndex + maxRows; i++) {
	                    if (!data[i]) {
	                        break;
	                    }
	
	                    results.push(data[i]);
	                }
	            }
	
	            return results;
	        }
	    }, {
	        key: 'noOfPages',
	        value: function noOfPages() {
	            var maxRows = this.maxRows;
	            var total = this.total;
	
	
	            if (!isPositiveInt(maxRows)) {
	                throw new Error('Maximum number of rows not set.');
	            }
	
	            return Math.ceil(total() / maxRows);
	        }
	    }, {
	        key: 'total',
	        value: function total() {
	            return this.data.length;
	        }
	    }, {
	        key: 'links',
	        value: function links() {
	            var links = {};
	
	            links.pages = this.availablePages();
	
	            if (this.hasPrevious()) {
	                links.prev = this.currentPage - 1;
	            }
	
	            if (this.hasNext()) {
	                links.next = this.currentPage + 1;
	            }
	
	            return links;
	        }
	    }]);
	
	    return Paginator;
	}();
	
	function isPositiveInt(value) {
	    return !isNaN(value) && value > 0;
	}
	
	exports.default = Paginator;

/***/ },
/* 2 */
/*!******************************!*\
  !*** ./lib/PaginatedList.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Paginator = __webpack_require__(/*! ./Paginator */ 1);
	
	var _Paginator2 = _interopRequireDefault(_Paginator);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Provides an easy API to for paginating a list of data(array).
	 *
	 * @author Kabir Baidhya
	 */
	
	var PaginatedList = function () {
	    function PaginatedList(data) {
	        _classCallCheck(this, PaginatedList);
	
	        this.data = data || [];
	        this.paginator = new _Paginator2.default(data);
	    }
	
	    _createClass(PaginatedList, [{
	        key: 'paginate',
	        value: function paginate(page, maxRows) {
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
	                noOfPages: this.paginator.noOfPages()
	            };
	        }
	    }, {
	        key: 'all',
	        value: function all() {
	            return data;
	        }
	    }, {
	        key: 'count',
	        value: function count() {
	            return data.length;
	        }
	    }]);
	
	    return PaginatedList;
	}();
	
	exports.default = PaginatedList;

/***/ }
/******/ ])));
//# sourceMappingURL=just-paginate.js.map