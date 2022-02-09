//
//  Static methods for html-templating: tables, anchors, etc.
//
class Elements {
    static table(obj, params=null) {
        const
            cols = Object.keys(obj);

        let
            th = '<tr><th>' + cols.join('</th><th>') + '</th></tr>',
            tb = '',
            tbs = [];

        for (const col of cols) {
            for (const i in obj[col]) {
                if (!Test.defined(tbs[i])) {
                    tbs[i] = {};
                }

                tbs[i][col] = obj[col][i];
            }
        }

        for(const t of tbs) {
            let b = '';

            for (const col of cols) {
                if (!Test.defined(t[col])) {
                    t[col] = '';
                }

                b += '<td>' + t[col] + '</td>';
            }

            tb += '<tr>' + b + '</tr>';
        }

        // Additional parameters

        let add = '';

        for (const p in params) {
            add += ' ' + p + '="' + params[p].toString() + '"';
        }

        // Alternative variant of code. It does the same
        //let add = Test.defined(params) ? Object.keys(params).map(function(p) {
        //    return p + '="' + params[p].toString() + '"';
        //}).join(' ') : '';

        return '<table' + add + '><thead>'+ th + '</thead><tbody>' + tb + '</tbody></table>';
    }

    static reference(ref) {
        let res = '';

        if (ref) {
            res = '<a data-reference="' + ref + '" class="_btn btn-link table-item-ref table-item-idx py-0">' + ref + '</a>';
        }

        return res;
    }
}


//
//  Base class for building exceptions around it
//
class Excepter {
    constructor(msg, ex) {
        this.message = msg;
        this.name = ex;

        console.log(this);
    }
}

//  Exception "Undefined data", i.e. no data has been provided
class ExUndefinedData extends Excepter {
    constructor(msg) {
        super(msg, 'undefined.data');
    }
}

//  Exception "Invalid datatype", i.e. there is no corresponding
//  construct method described for this type of data
class ExInvalidDatatype extends Excepter {
    constructor(msg) {
        super(msg, 'invalid.datatype');
    }
}

//  Exception "Items expected", i.e. "items" field expected in
//  the source data structure
class ExItemsExpected extends Excepter {
    constructor(msg) {
        super(msg, 'items.expected');
    }
}

// Exception ".builder method is not defined", i.e. ".builder" method
// should be implemented in a child class. The implementation
// strictly depends on DOM-container
class ExNoBuilder extends Excepter {
    constructor() {
        super('Метод .builder не определен', 'builder.error');
    }
}

// Exception ".activate method is not defined", i.e. ".activate" method
// should be implemented in a child class. The implementation
// strictly depends on DOM-container
class ExNoActivate extends Excepter {
    constructor() {
        super('Метод .activate не определен', 'activate.error');
    }
}


//
//  Logger class static methods
//
class Logger {
    //static _debug = true;
    static _debug = false;
    static _padding = 2;

    static log(str, obj, level=null) {
        if (this._debug) {
            console.log(
                level ? str.padStart(str.length + level * this._padding, ' ') : str,
                obj
            );
        }
    }
}


//
//  Data types testing class static methods
//
class Test {
    static _def(o, type) {
        return typeof o !== 'undefined' && o !== null && typeof o === type;
    }

    static defined(o) {
        return typeof o !== 'undefined' && o !== null;
    }

    static defined_arr(o) {
        return Test._def(o, 'object');
    }

    static defined_num(o) {
        return Test._def(o, 'number');
    }

    static defined_str(o) {
        return Test._def(o, 'string');
    }

    static not_empty_str(o) {
        return Test._def(o, 'string') && o !== '';
    }
}


//
//  Static methods to work with hash in a URI
//
class URIHash {
    static _dot = '.';

    static _get() {
        return decodeURI(window.location.hash.substring(1)).split(this._dot);
    }

    static _set(...params) {
        window.location.hash = '#' + params.join(this._dot);
    }

    static (tbl, col='') {
        window.location.hash = '#' + tbl + (col ? this._dot + col : '');
    }

    static get table() {
        return this._get()[0] || '';
    }

    static set table(tbl) {
        this._set(tbl);
    }

    static get column() {
        return this._get()[1] || '';
    }

    static set column(col) {
        this._set(this.table, col);
    }
}


//
//  Database tables info generation class
//
class Tables {
    constructor(tbl, selector) {
        this.sel = selector;

        try {
            this.res = this.obj._construct(tbl);

            Logger.log('res:', this.res);

            this.builder();

            // Switching to the table and column at startup
            if (URIHash.table) {
                this.change();
            }

            // Switching trigger to the table and column by clicking
            // on the link in the column title
            $('.table-item-ref').on('click', function(e) {
                window.location = '#' + $(this).data('reference');
                location.reload();
            });

            // Switching trigger to the table and column by clicking
            // on the link in the columns desciption
            $('.table-item-text a').on('click', function(e) {
                if ($(this).attr('href').startsWith('#')) {
                    window.location = $(this).attr('href');
                    location.reload();
                }
            });
        }
        catch(e) {
            Logger.log('ex:', e);
        }
    }

   /*
    *  This method switches output context into the tab specified in the URI hash parameter:
    *  database table or table & column. It also calls an abstract HTML-dependent method 'activate'
    *  that actually activates the tab. In this class, the method 'activate' is declared only and
    *  raises an exception. It should be implemented in a child class depending on HTML document
    *  structure, JS modules, etc.
    */
    change(ref=null) {
        const [tbl, col] = ref ? ref.split('.') : [URIHash.table, URIHash.column];

        Logger.log('change:', {tbl:tbl, col:col});

        this.activate(tbl);

        URIHash.table = tbl;

        if (Test.not_empty_str(col)) {
            const cnt = '.container-fluid [data-table="' + tbl + '"] [data-table-item="' + col + '"]';

            const $cnt = $(cnt);

            if ($cnt.length > 0) {
                $(window).scrollTop($cnt.offset().top);

                $(cnt + ' .collapse').collapse('show');

                $(cnt + ' .card').animate({
                    backgroundColor: 'rgba(255,0,0,0.2)'
                }, 200).animate({
                    backgroundColor: 'transparent'
                }, 200).animate({
                    backgroundColor: 'rgba(255,0,0,0.2)'
                }, 200).animate({
                    backgroundColor: 'transparent'
                }, 200);
            }

            //URIHash.column = col;
        }
    }

   /*
    *  Abstract method for comlete content generation.
    *  In this class, this method is declared only and raises an exception.
    *  It should be implemented in a child class depending on HTML document
    *  structure, JS modules, etc.
    */
    builder() {
        throw new ExNoBuilder();
    }

   /*
    *  Abstract method for activating tab.
    *  In this class, this method is declared only and raises an exception.
    *  It should be implemented in a child class depending on HTML document
    *  structure, JS modules, etc.
    */
    activate(table=null) {
        throw new ExNoActivate();
    }

    obj = {
       _construct: function(this_obj) {
            Logger.log('obj:', this_obj);

            let res = {};

            // The root of the source data structure is defined
            if (typeof this_obj !== 'undefined' && this_obj) {
                // Loop over data objects of the top level
                for (const o in this_obj) {
                    // Skipping current data object if property 'hide' is set to the 'true' value
                    if (this_obj[o].hide === true) {
                        continue;
                    }

                    const t = this_obj[o].type;

                    // The type of current data object is defined, and the processing function
                    // for this type of data object is also defined in this file.
                    // Lets call 'construct' method to proceed to the nested objects
                    //      *) Only 'TBL' data object type is available right now.
                    //         Other types require implemetation
                    if (typeof t !== 'undefined' && typeof this[t] !== 'undefined') {
                        res[o] = {
                            descr: this_obj[o].descr,
                            value: '<div class="container-fluid" data-table="' + o + '">' + this[t]._construct(this_obj[o], this) + '</div>'
                        }
                    }
                    else {
                        throw new ExInvalidDatatype('> Unknown data type `' + t + '` in /' + o);
                    }
                }
            }
            else {
                throw new ExUndefinedData('Data undefined');
            }

            return res;
        },

        TBL: {
           _construct: function(this_obj, parent) {
                Logger.log('tbl:', this_obj, 1);

                let res = '';

                if (Test.defined_str(this_obj.descr)) {
                    res += '<h5 class="table-descr">' + this_obj.descr + '</h5>';
                }

                if (Test.defined_str(this_obj.text)) {
                    res += '<p class="table-text">' + this_obj.text + '</p>';
                }

                if (Test.defined_arr(this_obj.items)) {
                    // Loop over items in the 'TBL' data object
                    for (const i in this_obj.items) {
                        // Skipping current item if property 'hide' is set to the 'true' value
                        if (this_obj.items[i].hide === true) {
                            continue;
                        }

                        const t = this_obj.items[i].type;

                        // The type of the item is defined, and the processing function
                        // for this item type is also defined in this file in the nested level.
                        // Lets call 'construct' method to proceed to the nested objects
                        //      *) Only 'COL' data object type is available right now.
                        //         Other types require implemetation
                        if (typeof t !== 'undefined' && typeof this[t] !== 'undefined') {
                            res += '<div class="row mb-3 table-item" data-table-item="' + i + '">' +
                                        '<div class="col-md-3 p-0 me-2"><span class="badge bg-secondary column-name w-100 text-md-start">' + i + '</span></div>' +
                                        '<div class="col-md card p-0">' + this[t]._construct(this_obj.items[i], this) + '</div>' +
                                   '</div>';
                        }
                        else {
                            throw new ExInvalidDatatype('>> Unknown data type `' + t + '` in //' + i);
                        }
                    }
                }
                else {
                    throw new ExItemsExpected('>> Items\' list expected in `' + JSON.stringify(this_obj) +'`');
                }

                return res;
            },
            COL: {
                // Formats index list of columns
               _columns: function(cols) {
                    let res = '';

                    if (Test.defined_arr(cols)) {
                        res = '["' + cols.join('", "') + '"]';
                    }

                    return res;
                },

                // Formats unique index
               _unique: function(u) {
                    return u ? '(UNIQUE)' : '';
                },

                // Formats fulltext index
               _fulltext: function(ft) {
                    return ft ? '(FT)' : '';
                },

                // Formats autoincrement property
               _autoincrement: function(ai) {
                    return ai ? '(AI)' : '';
                },

                // Formats NULL property
               _null: function(n) {
                    return n ? '(NULL)' : '';
                },

                // Formats a reference to the table.column as link
               _reference: function(icon, ref, nolink) {
                    if (ref) {
                        return '<i class="fas fa-' + icon + ' fa-xs" title="Link with &lt;table&gt;.&lt;column&gt;"></i> ' + (nolink ? ref : Elements.reference(ref));
                    }
                    else {
                        return '';
                    }
                },

                // Formats list of references to the table.column as links
               _references: function(icon, array_refs) {
                    let res = '',
                        refs = [];

                    if (array_refs && Array.isArray(array_refs)) {
                        for(const ref_item of array_refs) {
                            refs.push(
                                this._reference(icon, ref_item.reference, ref_item.nolink)
                            );
                        }

                        res = refs.filter(Test.not_empty_str).join('<br>');
                    }

                    return res;
                },

               _construct: function(this_obj, parent) {
                    Logger.log('col:', this_obj, 2);

                    const collapse_id = 'collapse-' + Math.round(Math.random()*10E7) + '-' + Math.round(Math.random()*10E4);
                    //const collapse_id = 'collapse-' + Date.now() + '-' + Math.round(Math.random()*10E5);

                    let res = '';

                    // Description

                    res += '<div class="card-header col-descr _p-0">' +
                                '<a data-bs-toggle="collapse" data-bs-target="#' + collapse_id + '" aria-expanded="false" aria-controls="' + collapse_id + '" class="_btn btn-link">' +
                                    //(this_obj.datatype || '<без типа>') + ' // ' +
                                    (this_obj.datatype ? '<span>' + this_obj.datatype + '</span>' : '') +
                                    '<span>' + (this_obj.descr || '&lt;no description&gt;') + '</span>' +
                                '</a>' +
                           '</div>';

                    // Column parameters

                    let pars = '';

                    if (Test.defined_arr(this_obj.params)) {
                        const params = [],
                              params_names = [];

                        // Loop over parameters in the 'COL' data object
                        for (const p in this_obj.params) {
                            const t = this_obj.params[p].type;

                            // The type of the parameter is defined, and the processing function
                            // for this parameter type is also defined in this file in the nested level.
                            // Lets call 'construct' method to proceed to the nested objects: PK, IDX, REF, FK, OPTS
                            if (typeof t !== 'undefined' && typeof this[t] !== 'undefined') {
                                //params.push(this[t]._construct(this_obj.params[p]));
                                params.push(this[t]._construct(this_obj.params[p], this));
                                params_names.push(t);
                            }
                            else {
                                throw new ExInvalidDatatype('>>> Unknown data type `' + t + '` in ///' + p);
                            }
                        }

                        pars = Elements.table({
                            'Parameter': params_names,
                            'Value': params
                        }, {
                            'class': 'table table-sm col-params'
                        });
                    }

                    // Column parameters' values

                    let vals = '';

                    if (Test.defined_arr(this_obj.vals)) {
                        vals = Elements.table({
                            'Value': Object.keys(this_obj.vals),
                            'Description': Object.values(this_obj.vals)
                        }, {
                            'class': 'table table-sm col-vals'
                        });
                    }

                    // Additional description

                    let text = '';

                    if (Test.defined_str(this_obj.text)) {
                        text = '<div class="table-item-text">' + this_obj.text + '</div>';
                    }

                    res += '<div class="collapse" id="' + collapse_id + '"><div class="card-body col-data">' +
                                (pars + vals + text || 'No description') +
                           '</div></div>';

                    return res;
                },

                PK: {
                   _construct: function(this_obj, parent) {
                        Logger.log('pk', this_obj, 3);

                        // COL's primary key property

                        let res = [
                                parent._unique(true),
                                parent._null(false),
                                parent._autoincrement(this_obj.autoincrement),
                                parent._fulltext(this_obj.fulltext),
                                parent._columns(this_obj.columns),
                            ].join(' ').trim();

                        const ref = parent._reference('arrow-right', this_obj.reference, this_obj.nolink),
                              refs = parent._references('arrow-right', this_obj.references);

                        return [res, ref, refs].filter(Test.not_empty_str).join('<br>');
                    }
                },

                IDX: {
                   _construct: function(this_obj, parent) {
                        Logger.log('idx', this_obj, 3);

                        // COL's index key property

                        let res = [
                            parent._unique(this_obj.unique),
                            parent._autoincrement(this_obj.autoincrement) || parent._null(this_obj.null),
                            parent._fulltext(this_obj.fulltext),
                            parent._columns(this_obj.columns),
                        ].join(' ').trim();

                        const ref = parent._reference('link', this_obj.reference, this_obj.nolink),
                              refs = parent._references('link', this_obj.references);

                        return [res, ref, refs].filter(Test.not_empty_str).join('<br>');
                    }
                },

                FK: {
                   _construct: function(this_obj, parent) {
                        Logger.log('fk', this_obj, 3);

                        // COL's foreign key property

                        return parent._reference('arrow-left', this_obj.reference, this_obj.nolink);
                    }
                },

                REF: {
                   _construct: function(this_obj, parent) {
                        Logger.log('ref', this_obj, 3);

                        // COL's list of references to the table.column

                        const ref = parent._reference('link', this_obj.reference, this_obj.nolink),
                              refs = parent._references('link', this_obj.references);

                        return [ref, refs].filter(Test.not_empty_str).join('<br>');
                    }
                },

                OPTS: {
                   _construct: function(this_obj, parent) {
                        Logger.log('opts', this_obj, 3);

                        // COL's list of other options

                        let res = parent._null(this_obj.null);

                        if (this_obj.options && Array.isArray(this_obj.options)) {
                            res += this_obj.options.join('<br>');
                        }

                        return res;
                    }
                }

            }
        }
    }

}


//
//  Tables child class for displaying DB tables as tabs
//
class NavTables extends Tables {
    builder() {
        const pref = 'v-pills-' + Math.round(Math.random() * 10000);
        //const pref = 'v-pills';

        let tabs = '',
            cont = '',
            show = '',
            i = 0;

        for (const o in this.res) {
            const tab_id = pref + '-' + i;
            //const tab_id = pref + '-' + o;

            tabs += `<button class="nav-link tbl-link" id="${tab_id}-tab" data-bs-toggle="pill" data-bs-target="#${tab_id}" type="button" role="tab" aria-controls="${tab_id}" aria-selected="false" data-navbar-table="${o}"><span data-bs-placement="right" data-bs-toggle="tooltip" title="${this.res[o].descr}">${o}</span></button>`;

            cont += `<div class="tab-pane fade" id="${tab_id}" role="tabpanel" aria-labelledby="${tab_id}-tab">${this.res[o].value}</div>`;

            i++;
        }

        $(this.sel).html(`
            <div class="row">
              <div class="col-sm-3">
                <div class="nav flex-column nav-pills me-2" id="${pref}-tab" role="tablist" aria-orientation="vertical">
                    ${tabs}
                </div>
              </div>
              <div class="col-sm alert alert-warning">
                <div class="tab-content" id="${pref}-tabContent">
                    ${cont}
                </div>
              </div>
            </div>
        `);

        $(this.sel + ' .nav-link').on('shown.bs.tab', function(e) {
            URIHash.table = $(this).data('navbar-table');
        });

    }

    // Overriding abstract method 'activate' that activates specified tab
    activate(table=null) {
        const t = table || URIHash.table,
              s = this.sel + ' [data-navbar-table="' + t + '"]';

        $(document).find(s).tab('show');
    }

}


//
//  DOM ready function. Creating an instance of NavTables only
//  after data is completely loaded
//
$(document).ready(function() {
    new NavTables(TBL_DATA, '#tables-1');

    // Bootstrap tooltips require initialization
    $('[data-bs-toggle=tooltip]').tooltip();
});
