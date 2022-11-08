---
title: "Notes - UART"
author: Benson Hsu
date: 2022-11-07
category: Jekyll
layout: post
tags: [communication, protocol]
---

>修網路實作的時候，給學弟妹講解 URAT 跟怎麼在 Arduino 上實作準備的一些教材

## How to transfer data between two computers?

* 5 Volts logic
* Signal on transmission medium
  * Metal : Square wave & Sine ware
  * Optical fiber : Light square ware
  * Wireless : Electromagnetic waves

5伏邏輯，怎麼傳遞資料？不同材料的波。

![](https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Waveforms.svg/600px-Waveforms.svg.png){:height="50%" width="50%"}

## The Universal Asynchronous Receiver/Transmitter (UART)

* In a world where technology can become obsolete very quickly
  * Still enjoys immense popularity.
  
UART這種簡單的通訊方式已經存在了幾十年，依然廣受歡迎。

## Asynchronous communication

異步通訊，所代表的是通訊中兩個byte之間的空隙是不固定的，而一個byte中的bit間隔是固定的。

## Capabilities and Characteristics

a basic UART system provides robust, moderate-speed, full-duplex communication with only three signals: Tx (transmitted serial data), Rx (received serial data), and ground.

一個基本收送的UART傳輸，僅需要三個端口Tx, Rx, GND。

但在這之前的前提是Rx, Tx, 在相同的數據傳輸頻率。

![](https://www.allaboutcircuits.com/uploads/articles/BBUART_diagram1_2.JPG){:height="50%" width="50%"}

## Key Terms

* `Start bit`: The first bit of a one-byte UART transmission. It indicates that the data line is leaving its idle state. The idle state is typically logic high, so the start bit is logic low.
  * The start bit is an overhead bit; this means that it facilitates communication between receiver and transmitter but does not transfer meaningful data.
* `Stop bit`: The last bit of a one-byte UART transmission. Its logic level is the same as the signal’s idle state, i.e., logic high. This is another overhead bit.

`Start bit`代表空閒的結束，Srart bit僅代表開始，不具實際數據。

`Stop bit`代表傳輸結束，電位拉高等待下一次 Start。

![](https://www.allaboutcircuits.com/uploads/articles/BBUART_diagram2_2.JPG)

* `Baud rate`: The approximate rate (in bits per second, or bps) at which data can be transferred.

Example : 9600-baud system，即代表 1 bit 需要 1/(9600 bps) ≈ 104.2 µs，注意
不是實際上每秒傳送 9600 資料，實際上有開銷bit的消耗。

![](https://www.allaboutcircuits.com/uploads/articles/BBUART_diagram3_2.JPG){:height="50%" width="50%"}

* `Parity bi`: An error-detection bit added to the end of the byte.
  * Odd or Even

如果要設定校正位，就多傳送一個Bit，並預先設計好Odd or Even。

如今天要傳送 00001110 而 even 即 校正為 1 這樣就會有偶數個 1。

![](https://ithelp.ithome.com.tw/upload/images/20201010/20120093cFTF1aC2Wb.png){:height="50%" width="50%"}

# Synchronizing and Sampling

the UART interface does not use a clock signal to synchronize the Tx and Rx devices. So how does the receiver know when to sample the transmitter’s data signal?

接收器的clock完全獨立於發送器clock。

![](https://www.allaboutcircuits.com/uploads/articles/BBUART_diagram5_2.JPG){:height="25%" width="25%"}

## Conclusion

所以當今天要設計一個UART單方向傳輸，僅用一條線就可以完成。
可以想像接收端的狀態，用程式的表示方式會不會是以迴圈進行，當接到0時，
以預設的頻率收接下來的 8 bit，當電位拉高代表一次傳送的結束。等待下次開始。

[Reference] Back to Basics: The Universal Asynchronous Receiver/Transmitter (UART)

[Reference]: https://www.allaboutcircuits.com/technical-articles/back-to-basics-the-universal-asynchronous-receiver-transmitter-uart/

