---
title: CAN - Controller Area Network
author: Donggun Ko
date: 2024-03-23
category: Jekyll
layout: post
---

In the ECU in the car there lived CAN.

# 1. Prologue
Concept of CAN

# 1.1 Concerning CAN

> CAN은 자동차 산업 분야에 적용하기 위해 고안된 직렬 통신 프로토콜이다.

## 특징

CAN은 Multi Master Network 이고 일반적으로 버스 형태로 네트워크를 형성한다.
- 이론적으로는 2032 개의 서로 다른 디바이스 (임베디드 컨트롤러) 를 하나의 네트워크상에 연결하여 통신을 수행할 수 있음
- CAN 트랜시버 (송신기) 의 한계로 인하여 실제로 연결할수 있는 Node (통신 주체) 수는 적음

Twist Pair Wire를 사용한다.

반이중 통신 (Half Duplex) 방식을 사용해서 메세지를 전송한다. 
- CSMA/CD+AMP (Carrier Sense Multiple Access / Collision Detection with Arbitration on Message Priority) 방식

## 동작 원리
1. 메시지 송신 전에 CAN 버스 라인이 사용 중인지 파악한다.
2. 사용 중이지 않으면 메세지를 보내고 사용 중이면 기다린다.
   - 메세지가 충돌날 수 있지만 우선순위를 비교해서 한 노드만 남고 나머지 노드는 수신하면서 다음 차례를 기다린다.
3. 메세지를 수신한 모든 노드는 ID를 확인해서 필요한 메세지만 받고 나머지는 무시한다.
   - CAN 네트워크에서 각각의 노드를 식별할 수 있도록 각 노드 마다 유일한 식별자(11bit 또는 29bit)를 갖는다.

## 종류
HS CAN(ISO 11898): 1Mbps 이상의 고속 통신 가능, 고속통신

LS CAN(ISO 11519): 125Kbps 까지의 통신 가능,  노이즈 강인성

## 호환성

Standard CAN(CAN 2.0A) Controller 는 standard CAN 포맷 방식의 메시지만 송수신이 가능하다.
- CAN 2.0 이전 사양(1.x)도 서로 통신할 수 있다
- Extended CAN 메시지를 수신하면 데이터를 무시한다

Extended CAN(CAN 2.0B) Controller 는 Standard, Extended 메시지 포맷 모두 송수신 가능하다.
- 만약 데이터 프레임이 standard와 extended 모두 같은 Base ID (첫 11 비트)를 가지면 Standard 데이터 프레임으로 인식한다. (SRR은 RTR 1로 인식)

## Layer

CAN은 여러 계층으로 세분화되어있다. Classic CAN에서 layer는 다음과 같다

<table>
  <tr>
    <th> OSI 7 Layers</th>
    <th> CAN 2.0 Part A<br>Standard CAN </th>
    <th> CAN 2.0 Part B<br>Extended CAN </th>
  </tr>
  <tr>
    <td> Application Layer </td>
    <td> Application Layer </td>
    <td> Application Layer </td>
  </tr>
  <tr>
    <td> Presentation Layer </td>
    <td> </td>
    <td> </td>
  </tr>
  <tr>
    <td> Session Layer </td>
  </tr>
  <tr>
    <td> Transport Layer </td>
  </tr>
  <tr>
    <td> Network Layer </td>
  </tr>
  <tr>
    <td rowspan="2"> Data Link Layer</td>
    <td>
    <strong>Object Layer</strong><br>
    - Message Filtering<br> 
    - Message and Status Handling
    </td>
    <td> 
    <strong>Logical Link Control sublayer</strong><br>
    - Acceptance Filtering<br>
    - Overload Notification<br>
    - Recovery Management
    </td>
  </tr>
  <tr>
    <td> 
    <strong>Transfer Layer</strong><br>
    - Fault Confinement<br>
    - Error Detection and Signalling<br>
    - Message Validation <br>
    - Acknowledgment<br>
    - Arbitration<br>
    - Message Framing<br>
    - Transfer Rate and Timing
    </td>
    <td> 
    <strong>Medium Access Control sublayer</strong><br>
    - Data Encapsulation / Decapsulation<br>
    - Frame Coding (Stuffing / Destuffing)<br>
    - Medium Access Management<br>
    - Error Detection<br>
    - Error Signalling<br>
    - Acknowledgment<br>
    - Serialization / Deserialization
    </td>
  </tr>
  <tr>
    <td> Physical Layer </td>
    <td>
    <strong>Physical Layer</strong><br>
    - Signal Level and Bit Representation<br>
    - Transmission Medium
    </td>
    <td>
    <strong>Physical Layer</strong><br>
    - Bit Encoding/Decoding<br>
    - Bit Timing<br>
    - Synchronization
    </td>
  </tr>
</table>


- CAN network는 Physical Layer와 Data Link Layer에 대한 내용이다.
  - Data Link Layer: Frame 송수신을 위한 계층
  - Physical Layer: 모든 전기적 특성과 관련하여 서로 다른 노드 간 비트 전송을 위한 계층 
- 상위 레이어는 다른 프로토콜을 사용해도 된다. (ex. XCP, UDS)


## CAN Frame Types

### Data Frame
데이터를 전달하기 위한 메세지.

<table>
    <tr>
        <th>Bitfield</th>
        <th>Standard CAN</th>
        <th>Extended CAN</th>
    </tr>
    <tr>
        <td>Start Of Frame<br>(SOF)</td>
        <td>
            1bit, bit "0"<br>
            메시지 프레임의 맨 앞에 위치함 
        </td>
        <td>Standard CAN 과 동일</td>
    </tr>
    <tr>
        <td rowspan="5">Arbitration Field</td>
        <td>ID (11-bit)</td>
        <td>Base ID (11-bit)</td>
    </tr>
    <tr>
        <td>
        RTR (1-bit), bit "0"<br>
        해당 메시지가 데이터 프레임이라는 것을 가리킴<br>
        - bit "1": 원격전송 요청(RTR : Remote Transmission Request)을 의미함.
        </td>
        <td>
        SSR (Substitute Remote Request, 1-bit)<br>bit "1"
        </td>
    </tr>
    <tr>
        <td></td>
        <td>IDE (1-bit), bit "1"</td>
    </tr>
    <tr>
        <td></td>
        <td>Extended ID (18-bit)</td>
    </tr>
    <tr>
        <td></td>
        <td>
        RTR (1-bit), bit "0"<br>
        해당 메시지가 데이터 프레임이라는 것을 가리킴
        </td>
    </tr>
    <tr>
        <td rowspan="3">Control Field</td>
        <td>Reserved 1, bit "0"(IDE)</td>
        <td>Reserved 1, bit "0"</td>
    </tr>
    <tr>
        <td>Reserved 0, bit "0"</td>
        <td>Reserved 0, bit "0"</td>
    </tr>
    <tr>
        <td>Data Length Code (4-bit)<br>0~8 byte 전송 가능</td> 
        <td>Standard CAN 과 동일</td>
    </tr>
    <tr>
        <td>Data Field</td>
        <td colspan="3">
        한 노드로부터 다른 노드로 전하고자 하는 데이터를 포함함.<br>
        DLC에 맞는 길이로 구성됨
        </td>
    </tr>
    <tr>
        <td rowspan="2">CRC Field</td>
        <td>CRC Sequence(15-bit)<br>
        CRC polynomial = 0b_1100_0101_1001_1001
        </td>    
        <td>Standard CAN 과 동일</td>
    </tr>
    <tr>
        <td>CRC Delimiter (1-bit), bit "1"</td>
        <td>Standard CAN 과 동일</td>
    </tr>
    <tr>
        <td rowspan="2">ACKnowledge Field</td>
        <td>
        ACK Slot (1-bit), bit "0"<br>
        다른 노드가 메시지를 성공적으로 수신하면 bit "1"로 변경함
        </td>
        <td>Standard CAN 과 동일</td>
    </tr>
    <tr>
        <td>ACK delimiter(1-bit), bit "1"</td>
        <td>Standard CAN 과 동일</td>
    </tr>
    <tr>
        <td>End Of Frame Field<br>(EOF)</td>
        <td>7-bit, 7bit 모두 "1"</td>
        <td>Standard CAN 과 동일</td>
    </tr>
</table>

Standard 와의 호환
1. Extended ID: Standard 와 호환을 위해 11+18 bit로 쪼개어 사용한다.
   - 앞 부분의 11bit ID가 같은 경우(Standard CAN 과 Extended CAN 이 충돌하는 경우) Extended CAN의 SSR 비트로 인해 Standard CAN이 항상 우선됨.
2. Standard Control Field의 R1과 같은 위치에 Extended Arbitration Field의 IDE가 존재한다.
   - 서로 반대 비트를 가짐. R1: bit "0", IDE: bit "1"




### Remote Frame

재전송을 요청하는 프레임이다. 

전체적으로 Data Frame과 비슷하지만 RTR 비트가 1이어야하고 데이터 필드가 없다.

### Error Frame

버스 에러를 감지했을때 사용한다.

모든 유닛이 전송할 수 있다.

<table>
    <tr>
        <th>Bitfield</th>
        <th>Standard CAN</th>
        <th>Extended CAN</th>
    </tr>
    <tr>
        <td>Error Flag</td>
        <td colspan="2">
Active Error: 6 consecutive 'dominant' bits<br>
Passive Error: 6 consecutive 'recessive' bits unless it is overwritten by ’dominant’ bits from other nodes.<br>
에러를 감지한 ’error active’ 스테이션은 active error flag를 전송한다. SOF부터 CRC까지 모든 필드에 적용되는 비트 스터핑을 위반해서 다른 스테이션에 알림.<br>
The PASSIVE ERROR FLAG is complete when these 6 equal bits have been detected.
        </td>
    </tr>
    <tr>
        <td>Error Delimeter</td>
        <td colspan="2">
        8 ’recessive’ bits<br>
ERROR FLAG 전송 후 각 스테이션은 'recessive' 비트를 전송하고 'recessive' 비트를 감지할 때까지 버스를 모니터링함. 그 후에는 7개의 'recessive' 비트를 더 전송하기 시작함
        </td>
    </tr>
</table>


### Overload Frame

프레임 사이에 추가 딜레이를 요청할때 사용한다.

<table>
    <tr>
        <th>Bitfield</th>
        <th>Standard CAN</th>
        <th>Extended CAN</th>
    </tr>
    <tr>
        <td>Overload Flag</td>
        <td colspan="2">
        6 ’dominant’ bits. Active Error 와 동일함
        </td>
    </tr>
    <tr>
        <td>Overload Delimeter</td>
        <td colspan="2">
        8 ’recessive’ bits. ERROR DELIMITER 와 동일함<br>
        OVERLOAD FLAG 전송 후 스테이션은 'dominant' 비트에서 'recessive' 비트로의 전환을 감지할 때까지 버스를 모니터링함.<br>
        이 시점에서 모든 버스 정류장은 OVERLOAD FLAG 전송을 완료하고 모든 정류장은 동시에 7개의 'recessive' 비트 전송을 시작함
        </td>
    </tr>
</table>

### Interframe Spacing

메세지 프레임을 구분하기 위한 장치
- Data Frame 및 Remote Frame은 interframe spacing을 통해 이전 프레임과 구분된다.
- Overload Frame 및 Error Frame은 해당 비트필드로 구분되지 않는다.


<table>
    <tr>
        <th>Bitfield</th>
        <th>Standard CAN</th>
        <th>Extended CAN</th>
    </tr>
    <tr>
        <td>Intermission</td>
        <td colspan="2">
        3 'recessive' bit<br>
        INTERMISSION 중에는 어떤 스테이션도 DATA FRAME 또는 REMOTE FRAME의 전송을 시작할 수 없음<br>
        OVERLOAD 조건을 알리는 것 외엔 아무것도 할 수 없음
        </td>
    </tr>
    <tr>
        <td>Bus Idle</td>
        <td colspan="2">
        BUS IDLE period는 임의의 길이일 수 있음<br>
        전송할 내용이 있는 모든 스테이션에서 버스에 액세스할 수 있음<br>
        다른 메시지 전송 중에 전송 보류 중인 메시지는 INTERMISSION 다음의 첫 번째 비트에서 시작됨<br>
        버스에서 'Dominant' 비트 감지는 프레임 시작으로 해석됨
        </td>
    </tr>
    <tr>
        <td>Suspend Transmission</td>
        <td colspan="2">
        'error passive' 스테이션의 경우에만 포함됨<br>
        'error passive' 스테이션은 메시지를 전송한 후 추가 메시지 전송을 시작하거나 버스가 Idle상태임을 인식하기 전에 INTERMISSION 다음에 8개의 'recessive' 비트를 보냄<br>
        그 동안 다른 스테이션에 의해 전송이 시작되면 스테이션은 이 메시지의 수신자가 됨
        </td>
    </tr>
</table>

해당 프레임이 끝나면 CAN 버스라인은 IDLE 상태로 인식된다.

## Other things related to CAN 2.0A

### Message Validation
메세지가 유효하다고 판단되는 시점
- 송신기: 보내는 메세지의 EOF가 끝날 때까지 오류가 없는 경우
- 수신기: 받는 메세지의 EOF가 마지막 1비트까지 오류가 없는 경우

### Coding
Data Frame과 Remote Frame의 SOF 부터 CRC Sequence 까지만 bit stuffing이 사용된다.
- bit stuffing: 연속되는 5개의 동일한 비트가 감지되면 자동으로 반대 비트를 섞어서 보내는 것.

비트스트림은 NRZ 방식으로 코딩된다.
- NRZ(Non Return to Zero): 한 비트를 표현할 때 전압을 계속 유지한다.
- RZ(Return to Zero): 한 클럭 내에서 데이터의 전압을 표현하고 다시 0으로 돌아간다.

![Compare-NRZ-RZ](https://upload.wikimedia.org/wikipedia/commons/9/95/Digital_signal_encoding_formats-en.svg)

출처 - 위키피디아

### Error Handling

**Error Detection**

1. Bit Error: 보낸 비트값이랑 버스에서 모니터링된 값이 다른 때
2. Stuff Error: 비트 스터핑이 잘못 되었을 때
3. CRC Error: 계산된 CRC 값과 수신된 결과가 다를 때
4. Form Error: 고정된 형식의 비트필드에 잘못된 비트가 포함된 때
5. Acknowledgment Error: ACK SLOT에서 수신기가 값을 바꾸지 않은 때

(+) 오류들은 같이 뜰 수 있음

**Error Signalling**

오류를 감지한 노드는 Error Flag를 전송한다.
- Error Active Node: Active Error Flag 전송
- Error Passive Node: Passive Error Flag 전송

### Fault Confinement

Fault Confinement 과 관련해서 송수신기는 아래 세 가지 상태 중에 있을 수 있다.

1. Error Active
   - 버스 통신에 참여할수 있음
   - 오류가 감지되면 Active Error Flag 전송함
2. Error Passive
   - 버스 통신에 참여할수 있음
   - 오류가 감지되면 Passive Error Flag 전송함
   - 플래그 전송후 추가 전송을 시작하기전 대기함
3. Bus Off
   - 버스에 어떤 영향도 미칠수 없음.

결함 제한을 위해 모든 버스 장치에 오류 횟수를 저장한다.
1. 전송 오류 횟수
2. 수신 오류 횟수

이러한 개수는 총 12개의 규칙에 따라 변경된다.
- 자세한 내용은 can 스펙 참조

## Other things related to CAN 2.0B

웬만한건 CAN 2.0 A와 겹치므로 Extended CAN에만 있는 내용을 추가했다.

### Message Filtering

전체 식별자를 기반으로 필터링된다
- 마스크 레지스터를 사용하여 연결된 수신 버퍼에 매핑할 식별자 그룹을 선택할 수 있다.
- 마스크 레지스터의 모든 비트는 프로그래밍 가능해야 한다. (메시지 필터링을 위해 활성화하거나 비활성화할 수 있다.)

# 1.2 Concerning CAN FD

CAN with Flexible Data-Rate

## 특징

CAN 2.0 프로토콜과 호환된다.
- ISO 11898-1에 따라 모든 CAN 메세지를 송수신 할 수 있음
- Data Link Layer, Physical Layer는 CAN 2.0 B 와 동일함

CAN 보다 빠르고 더 많은 비트를 전송할 수 있다.
- Classic CAN: 1 MBit/s, 8 Byte/Frame
- CAN FD:
  - Bit rate: Control Field의 BRS로 속도를 조절함
    - 1 MBit/s(Arbitration phase)
    - 8 MBit/s(Data Phase) 
  - DLC: 0~8 Bytes(CAN 호환) + 8~64 Bytes(추가)

프레임 형식이 추가 되었다.
- 4가지 프레임 형식(CAN or CANFD / BASE or EXTENDED)
   1. CAN BASE FORMAT: 11 bit long identifier and constant bit rate
   ![CAN_Base_Format](../assets/postsAssets/ConcerningCAN/CAN_Base_Format.png)
   2. CAN EXTENDED FORMAT: 29 bit long identifier and constant bit rate
   ![CAN_Extended_Format](../assets/postsAssets/ConcerningCAN/CAN_Extended_Format.png)
   3. CAN FD BASE FORMAT: 11 bit long identifier and dual bit rate
   ![CANFD_Base_Format](../assets/postsAssets/ConcerningCAN/CANFD_Base_Format.png)
   4. CAN FD EXTENDED FORMAT: 29 bit long identifier and dual bit rate
   ![CANFD_Extended_Format](../assets/postsAssets/ConcerningCAN/CANFD_Extended_Format.png)

CAN FD에는 Remote Frame이 없다.

# 1.3. Concerning CAN-based Protocols
## UDS on CAN

ISO 14229-3
- Road vehicles / Unified diagnostic services (UDS) / Part 3: Unified diagnostic services on CAN implementation (UDSonCAN)
- This document specifies an application profile for the implementation of unified diagnostic services (UDS) on controller area network (CAN) in road vehicles.
UDS on CAN references ISO 14229-1 and ISO 14229-2 and specifies implementation requirements of the diagnostic services to be used for diagnostic communication on CAN.
This document specifies
  - additional requirements specific to the implementation of UDS on the CAN network, and; 
  - specific restrictions in the implementation of UDS on the CAN network

ES 95486-02

etc..

## CCP/XCP

## Others
ISO-TP - ISO 15765-2(자동차 진단용 전송 프로토콜) 

EnergyBus - CiA 454 및 IEC 61851-3(배터리-충전기 통신)

SAE J1939(버스 및 트럭용 차량 내 네트워크)

SAE J2284(승용차용 차량 내 네트워크)

GMLAN - 제너럴 모터스(제너럴 모터스용)

# 1.4. Note on the car industry history 
CAN 이전 Mesh 형 토폴로지 사용
- GM사의 캐딜락

1986년 BOSCH, Automotive Serial Controller Area Network 개발
- 벤츠 요구
- 87년 Intel, CAN controller 출시
- 91년 MB CAN 적용 양산 차량(W140) 출시

1991년 CAN 2.0 발표
- part A 11 bit
- part B 29 bit

1993년 ISO CAN 표준 발표
- ISO 11898-1: Data link layer
- ISO 11898-2: 비내결함성 CAN physical layer(고속)
- ISO 11898-3: 내결함성을 위한 CAN physical layer(저속)
  - 11519-2
  - 95년 11898

1996년 OBD-II 표준 미국 의무화 
- 자동차, 경트럭 등

2001년 EOBD 표준 의무화(가솔린) 

2004년 EOBD 표준 의무화(디젤) 

2012년 Bosch CAN FD 1.0 발표 

2018년 CiA CAN XL 개발 시작

- 폭스바겐 요구


# 2. The First Journey

Communication with CAN



# 3. The Journey of the Nine Tools
1. DaVinci (Vector)
2. CANdb+ (Vector)
3. CANoe (Vector)
4. CANape (Vector)
5. INCA (ETAS)
6. TRACE32 (Vector)
7. mobilgene (HAE)
8. python scripting with CAN BUS Shield
9. etc..

# 4. The Treason of AUTOSAR 

AUTOSAR COM Stack
- CAN Driver
- CANIF
- CANTP
- PDUR
- COM
- CANSM
- CANNM
- IPDU
- DCM
- ComM
- and etc...

# 5. The Journey of the CAN bearers

?

# 6. The War of the CAN - Cyber Security For CAN

1. CAN Vulnerability 
2. 공격 방법
3. 방어 기법
   - E2E
   - CRC
   - SecOC

# 7. The End of the CAN Age 
Communication system after CAN

## 7.1 CAN XL
## 7.2 Flexlay
## 7.3 Ethernet


# 8. Appendix
## 8.1 Network Topology
1. Ring
2. Mesh
3. Star
4. Fully Connected 
5. Line
6. Tree
7. Bus

## 8.2. Other Communication in Vehicle
1. UART
2. SPI
3. LIN