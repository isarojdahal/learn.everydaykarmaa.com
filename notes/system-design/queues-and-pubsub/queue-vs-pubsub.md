---
title: Queues vs Pub/Sub
sidebar_position: 3
---


Key differences : 
Feature | 	Queuing System	| Pub/Sub System
--- | --- | ---
Message |  Consumption	Single consumer per message	| Multiple consumers per message
Model|	Point-to-point|	Broadcast|
Use Case|	Task distribution|	Real-time updates, notifications
Persistence |	Typically persistent	|Often transient



Key Differences: 

- Use queuing for task/job processing where one consumer should handle each message.
- Use pub/sub for scenarios where multiple consumers need the same message (e.g., live chat, stock price updates).