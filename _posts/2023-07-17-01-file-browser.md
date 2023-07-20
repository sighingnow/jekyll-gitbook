---
title: File Browser - Docker Compose
author: Elmagenta
date: 2023-07-17
category: Jekyll
layout: post
---

Default File Browser installation

```yaml
version: "3"
services:
  filebrowser:
    image: hurlenko/filebrowser:v2.23.0
    container_name: file_browser
    user: "1000:1000"
    ports:
      - 8080:8080
    volumes:
      - ./file_config:/config:rw
      - /:/data 
    restart: always
```

Personal File Browser installation
The difference is that with this folder mounting i can mount a folder, in this case they are called "share" and "personal", with different subfolders in it.
Why doing this?
Cause in File Browser you can give an user the access to ONE SINGLE FOLDER but with this structure of mounting i can give access to a user more folders by giving it the access to the more generic one.

```yaml
version: "3"
services:
  filebrowser:
    image: hurlenko/filebrowser:v2.23.0
    container_name: file_browser
    user: "1000:1000"
    ports:
      - 18080:8080
    volumes:
      - ./file_config:/config:rw
      - MyVolume3:/data/share/Folder3:rw
      - MyVolume4:/data/share/Folder4:rw
      - MyVolume1:/data/personal/Folder1:rw
      - MyVolume2:/data/personal/Folder2:rw
    restart: always

volumes:
  MyVolume1:
    driver_opts:
      type: 
      o:
      device: 
  MyVolume2:
    driver_opts:
      type: 
      o:
      device:
  MyVolume3:
    driver_opts:
      type: 
      o:
      device:
  MyVolume4:
    driver_opts:
      type: 
      o:
      device:
```
