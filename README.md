leDashboard
===============

An open source alternative for iGoogle

## Installation

  1. Give permission to the web server to write in the cache directory
  2. Copy config/users.json-dist to config/users.json
  3. Edit config/users.json. Remove and add users at will
  4. The password hash is generated with SHA1. You can compute the
     SHA1 hash of your desired password by trying to login with it.
     The error message will say "whoopsie THE_SHA-1_HASH".
  5. Create a directory config/your_user_name and make it writable
     by the web server. Your best option is to copy an existing user
     directory.

Default login is admin:admin

## Details

More detailed information can be found at

  * http://wiki.campino2k.de/programmierung/ledashboard (german)
  * http://wiki.campino2k.de/en/programmierung/ledashboard (english)
  
## Contributors

  * Christian Jung <campino2k@gmail.com>
  * Sergio Oller <sergioller@gmail.com>

## LICENCE

    Copyright (C) Christian Jung <campino2k@gmail.com>
    
    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; version 2 of the License
    
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
