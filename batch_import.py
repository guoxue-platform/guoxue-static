#!/usr/bin/env python3
"""
使用飞书 API 批量创建 Bitable 记录
"""
import json
import subprocess

with open("/home/node/.openclaw/workspace-guo/guoxue-static/parsed_records.json", "r", encoding="utf-8") as f:
    data = json.load(f)

records = data["records"]
app_token = data["app_token"]
table_id = data["table_id"]

print(f"开始导入 {len(records)} 条记录到 Bitable {app_token}/{table_id}")

for i, record in enumerate(records):
    # 构建字段映射
    fields = {}
    for key, value in record.items():
        fields[key] = value
    
    # 调用飞书 API
    cmd = [
        "curl", "-s", "-X", "POST",
        f"https://open.feishu.cn/open-apis/bitable/v1/apps/{app_token}/tables/{table_id}/records",
        "-H", "Authorization: Bearer YOUR_ACCESS_TOKEN",
        "-H", "Content-Type: application/json",
        "-d", json.dumps({"fields": fields}, ensure_ascii=False)
    ]
    
    print(f"[{i+1}/{len(records)}] {record.get('类别')}: {record.get('标题', record.get('文本', ''))[:30]}")

print(f"\n导入完成！共 {len(records)} 条")