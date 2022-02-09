var TBL_DATA = 
{
    "albums": {
        "type": "TBL",
        "descr": "List of albums",
        "hide": false,
        "items": {
            "AlbumId": {
                "type": "COL",
                "hide": false,
                "datatype": "INTEGER",
                "descr": "Identifier of album",
                "params": [{
                    "type": "PK",
                    "references": [{
                        "reference": "tracks.AlbumId",
                        "nolink": false
                    }],
                    "autoincrement": true,
                }],
                "text": "Place the column description here. HTML is also allowed but should be properly escaped in the source data file."
            },
            "Title": {
                "type": "COL",
                "datatype": "NVARCHAR(160)",
                "descr": "Title of album",
                "text": "Place the column description here. HTML is also allowed but should be properly escaped in the source data file."
            },
            "ArtistId": {
                "type": "COL",
                "datatype": "INTEGER",
                "descr": "Identifier of artist",
                "params": [{
                    "type": "IDX"
                }, {
                    "type": "FK",
                    "reference": "artists.ArtistId",
                }],
                "text": "Place the column description here. HTML is also allowed but should be properly escaped in the source data file."
            }
        },
        "text": "Source: <a href=\"https://github.com/lerocha/chinook-database/tree/master/ChinookDatabase/DataSources\" target=\"_blank\">GitHub<sup style=\"margin-left: 0.2em;\"><i class=\"fas fa-xs fa-external-link-alt\"></i></sup></a>",
    },
    "artists": {
        "type": "TBL",
        "descr": "List of artists",
        "items": {
            "ArtistId": {
                "type": "COL",
                "datatype": "INTEGER",
                "descr": "Identifier of album",
                "params": [{
                    "type": "PK",
                    "reference": "albums.ArtistId",
                    "autoincrement": true,
                }]
            },
            "Name": {
                "type": "COL",
                "datatype": "NVARCHAR(120)",
                "descr": "Title of album",
                "params": [{
                    "type": "OPTS",
                    "null": true,
                    "options": [],
                }],
                "vals": {
                    " 1": "AC/DC",
                    " 2": "Accept",
                    " 3": "Aerosmith",
                    "...": "-- Truncated --",
                    " 275": "Philip Glass Ensemble",
                }
            },
        },
        "text": "Source: <a href=\"https://github.com/lerocha/chinook-database/tree/master/ChinookDatabase/DataSources\" target=\"_blank\">GitHub<sup style=\"margin-left: 0.2em;\"><i class=\"fas fa-xs fa-external-link-alt\"></i></sup></a>",
    },
    "customers": {
        "type": "TBL",
        "descr": "List of customers",
        "items": {
            "CustomerId": {
                "type": "COL",
                "datatype": "INTEGER",
                "descr": "Identifier of customer",
                "params": [{
                    "type": "PK",
                    "reference": "invoices.CustomerId",
                    "autoincrement": true,
                }]
            },
            "FirstName": {
                "type": "COL",
                "datatype": "NVARCHAR(40)",
                "descr": "Customer first name"
            },
            "LastName": {
                "type": "COL",
                "datatype": "NVARCHAR(20)",
                "descr": "Customer last name"
            },
            "Company": {
                "type": "COL",
                "datatype": "NVARCHAR(80)",
                "descr": "Company name",
                "params": [{
                    "type": "OPTS",
                    "null": true,
                    "options": [],
                }]
            },
            "Address": {
                "type": "COL",
                "datatype": "NVARCHAR(70)",
                "params": [{
                    "type": "OPTS",
                    "null": true,
                    "options": [],
                }]
            },
            "City": {
                "type": "COL",
                "datatype": "NVARCHAR(40)",
                "params": [{
                    "type": "OPTS",
                    "null": true,
                    "options": [],
                }]
            },
            "State": {
                "type": "COL",
                "datatype": "NVARCHAR(40)",
                "params": [{
                    "type": "OPTS",
                    "null": true,
                    "options": [],
                }]
            },
            "Country": {
                "type": "COL",
                "datatype": "NVARCHAR(40)",
                "params": [{
                    "type": "OPTS",
                    "null": true,
                    "options": [],
                }]
            },
            "PostalCode": {
                "type": "COL",
                "datatype": "NVARCHAR(10)",
                "params": [{
                    "type": "OPTS",
                    "null": true,
                    "options": [],
                }]
            },
            "Phone": {
                "type": "COL",
                "datatype": "NVARCHAR(24)",
                "params": [{
                    "type": "OPTS",
                    "null": true,
                    "options": [],
                }]
            },
            "Fax": {
                "type": "COL",
                "datatype": "NVARCHAR(24)",
                "params": [{
                    "type": "OPTS",
                    "null": true,
                    "options": [],
                }]
            },
            "Email": {
                "type": "COL",
                "datatype": "NVARCHAR(60)",
                "descr": "Email address of the customer"
            },
            "SupportRepId": {
                "type": "COL",
                "datatype": "INTEGER",
                "descr": "Identifier of an employee who operated the customer's order",
                "params": [{
                    "type": "IDX",
                    "null": true,
                }, {
                    "type": "FK",
                    "reference": "employees.EmployeeId",
                }],
                "vals": {
                    3: "Peacock Jane",
                    4: "Park Margaret",
                    5: "Johnson Steve"
                }
            },
        },
        "text": "Source: <a href=\"https://github.com/lerocha/chinook-database/tree/master/ChinookDatabase/DataSources\" target=\"_blank\">GitHub<sup style=\"margin-left: 0.2em;\"><i class=\"fas fa-xs fa-external-link-alt\"></i></sup></a>",
    },
    "employees": {
        "type": "TBL",
        "descr": "List of employees",
        "items": {
            "EmployeeId": {
                "type": "COL",
                "datatype": "INTEGER",
                "descr": "Identifier of employee",
                "params": [{
                    "type": "PK",
                    "references":[{
                        "reference": "customers.SupportRepId"
                    }, {
                        "reference": "employees.ReportsTo"
                    }],
                    "autoincrement": true,
                }]
            },
            "LastName": {
                "type": "COL",
                "datatype": "NVARCHAR(20)",
                "descr": "Employee last name"
            },
            "FirstName": {
                "type": "COL",
                "datatype": "NVARCHAR(20)",
                "descr": "Employee first name"
            },
            "Title": {
                "type": "COL",
                "datatype": "NVARCHAR(30)",
                "descr": "Job position title",
                "params": [{
                    "type": "OPTS",
                    "null": true,
                }],
            },
            "ReportsTo": {
                "type": "COL",
                "datatype": "INTEGER",
                "descr": "Id of the parent employee",
                "params": [{
                    "type": "IDX",
                    "null": true,
                }, {
                    "type": "FK",
                    "reference": "employees.EmployeeId",
                }],
                "vals": {
                    "NULL": "No parent employee (Top manager)",
                }
            },
            "BirthDate": {
                "type": "COL",
                "datatype": "DATETIME",
                "params": [{
                    "type": "OPTS",
                    "null": true,
                }],
            },
            "HireDate": {
                "type": "COL",
                "datatype": "DATETIME",
                "params": [{
                    "type": "OPTS",
                    "null": true,
                }],
            },
            "Address": {
                "type": "COL",
                "datatype": "NVARCHAR(70)",
                "params": [{
                    "type": "OPTS",
                    "null": true,
                }],
            },
            "City": {
                "type": "COL",
                "datatype": "NVARCHAR(40)",
                "params": [{
                    "type": "OPTS",
                    "null": true,
                }],
            },
            "State": {
                "type": "COL",
                "datatype": "NVARCHAR(40)",
                "params": [{
                    "type": "OPTS",
                    "null": true,
                }],
            },
            "Country": {
                "type": "COL",
                "datatype": "NVARCHAR(40)",
                "params": [{
                    "type": "OPTS",
                    "null": true,
                }],
            },
            "PostalCode": {
                "type": "COL",
                "datatype": "NVARCHAR(10)",
                "params": [{
                    "type": "OPTS",
                    "null": true,
                }],
            },
            "Phone": {
                "type": "COL",
                // The phone number probably should be normalised and stored as integer 
                "datatype": "NVARCHAR(24)",
                "params": [{
                    "type": "OPTS",
                    "null": true,
                }],
            },
            "Fax": {
                "type": "COL",
                // The fax number probably should be normalised and stored as integer 
                "datatype": "NVARCHAR(24)",
                "params": [{
                    "type": "OPTS",
                    "null": true,
                }],
            },
            "Email": {
                "type": "COL",
                "datatype": "NVARCHAR(60)",
                "params": [{
                    // It is better to make it a unique index to prevent records from duplicating
                    "type": "IDX",
                    "unique": true,
                    "null": true,
                }],
            },
        },
        "text": "Source: <a href=\"https://github.com/lerocha/chinook-database/tree/master/ChinookDatabase/DataSources\" target=\"_blank\">GitHub<sup style=\"margin-left: 0.2em;\"><i class=\"fas fa-xs fa-external-link-alt\"></i></sup></a>",
    },
    "genres": {
        "type": "TBL",
        "descr": "List of genres",
        "items": {
            "GenreId": {
                "type": "COL",
                "datatype": "INTEGER",
                "descr": "Identifier of genre",
                "params": [{
                    "type": "PK",
                    "reference": "tracks.GenreId",
                    "autoincrement": true,
                }]
            },
            "Name": {
                "type": "COL",
                "datatype": "NVARCHAR(120)",
                "descr": "Genre name",
                "params": [{
                    "type": "OPTS",
                    "null": true,
                }],
                "vals": {
                    1:	"Rock",
                    2:	"Jazz",
                    3:	"Metal",
                    4:	"Alternative & Punk",
                    5:	"Rock And Roll",
                    6:	"Blues",
                    7:	"Latin",
                    8:	"Reggae",
                    9:	"Pop",
                    10:	"Soundtrack",
                    11:	"Bossa Nova",
                    12:	"Easy Listening",
                    13:	"Heavy Metal",
                    14:	"R&B/Soul",
                    15:	"Electronica/Dance",
                    16:	"World",
                    17:	"Hip Hop/Rap",
                    18:	"Science Fiction",
                    19:	"TV Shows",
                    20:	"Sci Fi & Fantasy",
                    21:	"Drama",
                    22:	"Comedy",
                    23:	"Alternative",
                    24:	"Classical",
                    25:	"Opera"
                }
            },
        },
        "text": "Source: <a href=\"https://github.com/lerocha/chinook-database/tree/master/ChinookDatabase/DataSources\" target=\"_blank\">GitHub<sup style=\"margin-left: 0.2em;\"><i class=\"fas fa-xs fa-external-link-alt\"></i></sup></a>",
    },
    "invoice_items": {
        "type": "TBL",
        "descr": "List of invoice items",
        "items": {
            "InvoiceLineId": {
                "type": "COL",
                "datatype": "INTEGER",
                "descr": "Invoice item identifier",
                "params": [{
                    "type": "PK",
                    "autoincrement": true,
                }]
            },
            "InvoiceId": {
                "type": "COL",
                "datatype": "INTEGER",
                "descr": "Invoice identifier",
                "params": [{
                    "type": "IDX",
                }, {
                    "type": "FK",
                    "reference": "invoices.InvoiceId",
                }]
            },
            "TrackId": {
                "type": "COL",
                "datatype": "INTEGER",
                "descr": "Track identifier",
                "params": [{
                    "type": "IDX",
                }, {
                    "type": "FK",
                    "reference": "tracks.TrackId",
                }, {
                    "type": "REF",
                    "reference": "playlist_track.TrackId"
                }]
            },
            "UnitPrice": {
                "type": "COL",
                "datatype": "NUMERIC(10, 2)",
                "descr": "Unit price"
            },
            "Quantity": {
                "type": "COL",
                "datatype": "INTEGER"
            }
        },
        "text": "Source: <a href=\"https://github.com/lerocha/chinook-database/tree/master/ChinookDatabase/DataSources\" target=\"_blank\">GitHub<sup style=\"margin-left: 0.2em;\"><i class=\"fas fa-xs fa-external-link-alt\"></i></sup></a>",
    },
    "invoices": {
        "type": "TBL",
        "descr": "List of invoices",
        "items": {
            "InvoiceId": {
                "type": "COL",
                "datatype": "INTEGER",
                "descr": "Invoice identifier",
                "params": [{
                    "type": "PK",
                    "autoincrement": true,
                    "reference": "invoice_items.InvoiceId",
                }]
            },
            "CustomerId": {
                "type": "COL",
                "datatype": "INTEGER",
                "descr": "Customer identifier",
                "params": [{
                    "type": "IDX"
                }, {
                    "type": "FK",
                    "reference": "customers.CustomerId",
                }]
            },
            "InvoiceDate": {
                "type": "COL",
                "datatype": "DATETIME",
                "descr": "Date of purchase"
            },
            "BillingAddress": {
                "type": "COL",
                "datatype": "NVARCHAR(70)",
                "params": [{
                    "type": "OPTS",
                    "null": true
                }]
            },
            "BillingCity": {
                "type": "COL",
                "datatype": "NVARCHAR(40)",
                "params": [{
                    "type": "OPTS",
                    "null": true
                }]
            },
            "BillingState": {
                "type": "COL",
                "datatype": "NVARCHAR(40)",
                "params": [{
                    "type": "OPTS",
                    "null": true
                }]
            },
            "BillingCountry": {
                "type": "COL",
                "datatype": "NVARCHAR(40)",
                "params": [{
                    "type": "OPTS",
                    "null": true
                }]
            },
            "BillingPostalCode": {
                "type": "COL",
                "datatype": "NVARCHAR(10)",
                "params": [{
                    "type": "OPTS",
                    "null": true
                }]
            },
            "Total": {
                "type": "COL",
                "datatype": "NUMERIC(10, 2)",
                "descr": "Total price of the order"
            }
        },
        "text": "Source: <a href=\"https://github.com/lerocha/chinook-database/tree/master/ChinookDatabase/DataSources\" target=\"_blank\">GitHub<sup style=\"margin-left: 0.2em;\"><i class=\"fas fa-xs fa-external-link-alt\"></i></sup></a>",
    },
    "media_types": {
        "type": "TBL",
        "descr": "Media types",
        "items": {
            "MediaTypeId": {
                "type": "COL",
                "datatype": "INTEGER",
                "descr": "Media type identifier",
                "params": [{
                    "type": "PK",
                    "reference": "tracks.MediaTypeId",
                    "autoincrement": true,
                }],
            },
            "Name": {
                "type": "COL",
                "datatype": "NVARCHAR(120)",
                "descr": "Media type name",
                "params": [{
                    "type": "OPTS",
                    "null": true,
                }],
                "vals": {
                    1: "MPEG audio file",
                    2: "Protected AAC audio file",
                    3: "Protected MPEG-4 video file",
                    4: "Purchased AAC audio file",
                    5: "AAC audio file",
                }
            },
        },
        "text": "Source: <a href=\"https://github.com/lerocha/chinook-database/tree/master/ChinookDatabase/DataSources\" target=\"_blank\">GitHub<sup style=\"margin-left: 0.2em;\"><i class=\"fas fa-xs fa-external-link-alt\"></i></sup></a>",
    },
    "playlist_track": {
        "type": "TBL",
        "descr": "Playlist items",
        "items": {
            "PlaylistId": {
                "type": "COL",
                "datatype": "INTEGER",
                "descr": "Playlist identifier",
                "params": [{
                    "type": "PK",
                    "autoincrement": false,
                    "columns": ["PlaylistId", "TrackId"]
                }, {
                    "type": "FK",
                    "reference": "playlists.PlaylistId",
                }],
            },
            "TrackId": {
                "type": "COL",
                "datatype": "INTEGER",
                "descr": "Track identifier",
                "params": [{
                    "type": "PK",
                    "autoincrement": false,
                    "columns": ["PlaylistId", "TrackId"]
                }, {
                    "type": "FK",
                    "reference": "tracks.TrackId",
                }, {
                    "type": "REF",
                    "reference": "invoice_items.TrackId"
                }],
            },
        },
        "text": "Source: <a href=\"https://github.com/lerocha/chinook-database/tree/master/ChinookDatabase/DataSources\" target=\"_blank\">GitHub<sup style=\"margin-left: 0.2em;\"><i class=\"fas fa-xs fa-external-link-alt\"></i></sup></a>",
    },
    "playlists": {
        "type": "TBL",
        "descr": "Playlists",
        "items": {
            "PlaylistId": {
                "type": "COL",
                "datatype": "INTEGER",
                "descr": "Playlist identifier",
                "params": [{
                    "type": "PK",
                    "reference": "playlists.PlaylistId",
                    "autoincrement": true,
                }],
            },
            "Name": {
                "type": "COL",
                "datatype": "NVARCHAR(120)",
                "descr": "Playlist name",
                "params": [{
                    "type": "OPTS",
                    "null": true,
                }],
            },
        },
        "text": "Source: <a href=\"https://github.com/lerocha/chinook-database/tree/master/ChinookDatabase/DataSources\" target=\"_blank\">GitHub<sup style=\"margin-left: 0.2em;\"><i class=\"fas fa-xs fa-external-link-alt\"></i></sup></a>",
    },
    "tracks": {
        "type": "TBL",
        "descr": "List of tracks",
        "items": {
            "TrackId": {
                "type": "COL",
                "datatype": "INTEGER",
                "descr": "Track identifier",
                "params": [{
                    "type": "PK",
                    "references": [{
                        "reference": "playlist_track.TrackId",
                        "nolink": false
                    }, {
                        "reference": "invoice_items.TrackId",
                        "nolink": false
                    }],
                    "autoincrement": true,
                }],
            },
            "Name": {
                "type": "COL",
                "datatype": "NVARCHAR(200)",
                "descr": "Track name",
            },
            "AlbumId": {
                "type": "COL",
                "datatype": "INTEGER",
                "descr": "Album identifier",
                "params": [{
                    "type": "IDX",
                    "null": true,
                }, {
                    "type": "FK",
                    "reference": "albums.AlbumId",
                }],
            },
            "MediaTypeId": {
                "type": "COL",
                "datatype": "INTEGER",
                "descr": "Media type identifier",
                "params": [{
                    "type": "IDX",
                }, {
                    "type": "FK",
                    "reference": "media_types.MediaTypeId",
                }],
            },
            "GenreId": {
                "type": "COL",
                "datatype": "INTEGER",
                "descr": "Genre identifier",
                "params": [{
                    "type": "IDX",
                    "null": true,
                }, {
                    "type": "FK",
                    "reference": "genres.GenreId",
                }],
            },
            "Composer": {
                "type": "COL",
                "datatype": "NVARCHAR(220)",
                "descr": "Composer name",
                "params": [{
                    "type": "OPTS",
                    "null": true
                }],
            },
            "Milliseconds": {
                "type": "COL",
                "datatype": "INTEGER",
                "descr": "Track duration, milliseconds",
            },
            "Bytes": {
                "type": "COL",
                "datatype": "INTEGER",
                "descr": "Track size, bytes",
                "params": [{
                    "type": "OPTS",
                    "null": true
                }],
            },
            "UnitPrice": {
                "type": "COL",
                "datatype": "NUMERIC(10,2)",
                "descr": "Track price",
            },
        },
        "text": "Source: <a href=\"https://github.com/lerocha/chinook-database/tree/master/ChinookDatabase/DataSources\" target=\"_blank\">GitHub<sup style=\"margin-left: 0.2em;\"><i class=\"fas fa-xs fa-external-link-alt\"></i></sup></a>",
    }
};
