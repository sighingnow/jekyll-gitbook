---
title: Introduction_to_Grafana
author: red_ginseng
date: 2022-11-05
category: Grafana
layout: post
---



# Grafana OSS

[그라파나 오픈소스 소프트웨어](https://grafana.com/oss/)를 사용해서 저장된 메트릭, 로그, 트레이스에 대해서 질의해보세요. 알람을 설정하거나 탐색을 할 수도 있습니다. 그라파나 OSS를 사용하면, 시계열 데이터베이스에 저장된 데이터를 그래프나 여타의 시각화된 형태로 만들수 있습니다.

[그라파나를 설치]({{< relref "../setup-grafana/installation/" >}})한 후, 첫 번째 대시보드를 만들고 설정해보세요. [Getting Started with Grafana]({{< relref "../getting-started/build-first-dashboard.md" >}}) 를 참고하세요. 필요에 맞는 옵션을 선택하여 대시보드를 만들 수도 있습니다. 예를 들어, 날씨 데이터와 스마트홈의 통계지표를 보고 싶다고 해봅시다. 그렇다면 [playlist]({{< relref "../dashboards/create-manage-playlists/" >}})를 만들어보세요. 기업의 관리자이거나, 여러팀의 그라파나를 담당하고 있다면 [provisioning]({{< relref "../administration/provisioning/" >}})이나 [authentication]({{< relref "../setup-grafana/configure-security/configure-authentication/" >}}) 설정할 수 있습니다.

다음 섹션에서는 그라파나 기능에 대한 개요가 이어집니다. 이와 함께 제품에 대해 더 자세히 살펴볼 수 있는 문서의 링크도 제공됩니다. 더 많은 가이드와 아이디어를 원하시면, [Grafana Commuity forums](https://community.grafana.com/)를 방문해보세요.

## Explore metrics, logs, and traces

즉석에서 짠 쿼리를 날리고, 드릴다운 방식으로 데이터를 확인해보세요. 보기를 분할하여 시간대별, 쿼리별, 데이터소스별 데이터를 비교해보세요. 더 자세한 사항은 [Explore]({{< relref "../explore/" >}})에서 확인해보세요. 
## Alerts

그라파나 경고 기능을 사용하면, 다양한 방법으로 경고를 보낼 수 있습니다. PagerDuty, SMS, email, VictorOps, OpsGenie, Slack 등도 포함됩니다.

Alert hooks allow you to create different notifiers with a bit of code if you prefer some other channels of communication. Visually define [alert rules]({{< relref "../alerting/alerting-rules/" >}}) for your most important metrics.

## Annotation

그래프에 나타나는 이벤트에 대해 주석을 추가해보세요. 마우스를 올리면, 해당 이벤트의 메타정보와 태그를 확인할 수 있습니다.

무언가 문제가 발생했을 경우, 어떤 데이터 . 그래프를 클릭하고, 텍스트를 작성하는 간단한 방법으로 주석을 직접 만들 수도 있습니다. 혹은 데이터 소스에서 데이터를 받아와 동적으로 주석을 만들 수도 있습니다. 더 자세한 사항은 [Annotations]({{< relref "../dashboards/build-dashboards/annotate-visualizations" >}})에서 확인해보세요. 

## Dashboard variables

[Template variables]({{< relref "../dashboards/variables" >}})을 사용하면, 여러 유즈케이스에서 재사용할 수 있는 대시보드를 만들 수 있습니다. 템플릿과 변수를 사용하면, 프로덕션 서버와 테스트 서버를 위한 대시보드를 별도로 생성할 필요가 없습니다.   

템플릿 기능을 사용해서 데이터를 드릴다운 할 수 있습니다. 가령, 북미 전체 데이터에서 텍사스주 데이터, 그리고 더 하위 데이터까지 내려갈 수 있습니다. 직접 만든 대시보드를 팀, 조직에 공유해보세요. 사용자들이 재사용할 수 있도록, 외부 커뮤니티에 공유하는 방식으로 공헌할 수도 있습니다.

## Configure Grafana

그라파나 관리자라면, [Grafana configuration options]({{< relref "../setup-grafana/configure-grafana/" >}})와 [Grafana CLI]({{< relref "../cli.md" >}})에 완전히 익숙해지셔야 합니다. 

설정 파일과 환경변수를 통해 그라파나를 설정할 수 있습니다. 기본 포트, 로깅 레벨, 이메일 IP 주소, 보안 등을 설정할 수 있습니다.

## Import dashboards and plugins

공식 라이브러리에서 [dashboards](https://grafana.com/grafana/dashboards)와 [plugins](https://grafana.com/grafana/plugins)을 찾아보세요. 열정있는 커뮤니티 멤버들 덕에, 매주 새로운 대시보드와 플러그인이 추가됩니다.

## Authentication

그라파나는 LDAP, OAuth를 포함한 다양한 인증 수단을 제공합니다. 인증 수단을 통해 사용자와 조직을 이어주세요. 더 자세한 사항은 [User authentication overview]({{< relref "../setup-grafana/configure-security/configure-authentication/" >}})에서 확인해보세요.  

그라파나 Enterprise 에서는 사용자와 팀을 이어줄 수 있습니다. 사내 별도 인증시스템이 마련되어 있다면, 해당 시스템에서 관리하고 있는 팀과 그라파나의 팀을 이어주세요. 사내 인증시스템에 설정된 권한에 따라, 사용자들이 접근할 수 있는 대시보드가 제한됩니다. 더 자세한 사항은 Grafana Enterprise]({{< relref "./grafana-enterprise" >}})에서 확인해보세요.

## Provisioning

클릭과 드래그&드랍을 통해 쉽게 대시보드를 생성할 수 있습니다. 하지만 많은 대시보드를 만들어야 하는 사용자의 경우, 자동화 스크립트를 통해 대시보드를 만들고 싶을 것입니다. 그라파나에서는 스크립트 기능을 제공합니다.

예를 들어, 쿠버네티스 클러스터를 구성하는 경우에도 스크립트를 사용할 수 있습니다. 서버 정보, IP 주소와 데이터 소스와 같은 정보를 기입해둔 스크립트를 사용하면, Grafana를 기동할 수 있습니다. 이 방법을 통해 많은 수의 대시보드를 한꺼번에 제어할 수도 있습니다. 더 자세한 사항은 [Provisioning]({{< relref "../administration/provisioning/" >}})에서 확인해보세요.

## Permissions

여러 팀이 하나의 그라파나를 사용해야하는 조직이라면, 일부 대시보드는 공유하면서, 정보는 분리할 필요가 있습니다. 팀을 만들고 [folders and dashboards]({{< relref "../administration/user-management/manage-dashboard-permissions/" >}})에 권한을 부여해보세요. [Grafana Enterprise]({{< relref "./grafana-enterprise" >}})를 사용하면, 데이터 소스 레벨에도 권한을 부여할 수 있습니다.

## Other Grafana Labs OSS Projects

Grafana Labs에서는 그라파나 외에도 아래와 같은 오픈소스 프로젝트를 제공하고 있습니다. 

Grafana Loki: 그라파나 로키는 로깅 스택의 구성요소로 사용될 수 있는 다양한 기능을 갖춘 오픈소스입니다. 더 자세한 사항은 [Grafana Loki documentation](https://grafana.com/docs/loki/latest/)에서 확인해보세요.

Grafana Tempo: 그라파나 템포는 대용량 분산 추적을 위한, 사용하기 쉬운 오픈소스 소프트웨어입니다. 더 자세한 사항은 [Grafana Tempo documentation](https://grafana.com/docs/tempo/latest/?pg=oss-tempo&plcmt=hero-txt/)에서 확인해보세요.

Grafana Mimir: 그라파나 미미르는 오픈소스 소프트웨어 프로젝트입니다. 프로메테우스의 시계열 데이터를 장기간 보관할 수 있는, 확장가능한 저장소입니다. 더 자세한 사항은 [Grafana Mimir documentation](https://grafana.com/docs/mimir/latest/)에서 확인해보세요.