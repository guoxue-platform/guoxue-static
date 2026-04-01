#!/usr/bin/env python3
"""
批量导入国学内容到新 Bitable
Bitable: Rskxbl5JkaRL1psJlyPc84IxnVu (tblXbNV2hl2CF9XY)
字段: 文本(主) / 类别 / 四部分类 / 标题 / 出处/作者
"""

import os
import re
import json
from pathlib import Path

# 内容包路径
BASE = Path("/home/node/.openclaw/workspace-guo/guoxue-static")

# Bitable 配置
APP_TOKEN = "Rskxbl5JkaRL1psJlyPc84IxnVu"
TABLE_ID = "tblXbNV2hl2CF9XY"

# 四部分类映射
SIBU_MAP = {
    "jing": "经部",
    "shi": "史部", 
    "zi": "子部",
    "ji": "集部"
}

def parse_mingju_content(content: str, sibu: str) -> list:
    """解析名句内容"""
    records = []
    # 匹配模式: 序号. **原文** —— 解释。（王勃《送...》） 或 （《诗经·周南·关雎》）
    pattern = re.compile(
        r'^\d+\.\s+\*\*(.+?)\*\*\s*——\s*(.+?)\s*[（(]([^）)]+?)[)）]',
        re.MULTILINE
    )
    for match in pattern.finditer(content):
        text = match.group(1).strip()
        explanation = match.group(2).strip()
        source = match.group(3).strip()
        records.append({
            "文本": text,
            "类别": "名句",
            "四部分类": SIBU_MAP.get(sibu, sibu),
            "标题": source,
            "出处/作者": source
        })
    return records

def parse_diangu_content(content: str, sibu: str) -> list:
    """解析典故内容"""
    records = []
    # 匹配 ## 标题 段落，然后分别找典故/出处/释义
    sections = re.split(r'\n## ', content)
    for section in sections[1:]:  # skip first which is title
        lines = section.strip().split('\n')
        if not lines:
            continue
        title = lines[0].strip()
        record = {
            "文本": title,
            "类别": "典故",
            "四部分类": SIBU_MAP.get(sibu, sibu),
            "标题": title,
            "出处/作者": ""
        }
        for line in lines[1:]:
            if line.startswith('**出处：**'):
                record["出处/作者"] = line.replace('**出处：**', '').strip()
                break
        records.append(record)
    return records

def parse_zuozhe_content(content: str, sibu: str) -> list:
    """解析作者内容"""
    records = []
    sections = re.split(r'\n## ', content)
    for section in sections[1:]:
        lines = section.strip().split('\n')
        if not lines:
            continue
        # 标题行包含作者名和朝代
        title_line = lines[0].strip()
        # 提取作者名（去掉括号里的朝代）
        name_match = re.match(r'^(.+?)（(.+?)）', title_line)
        if name_match:
            name = name_match.group(1).strip()
            dynasty = name_match.group(2).strip()
        else:
            name = title_line
            dynasty = ""
        records.append({
            "文本": name,
            "类别": "作者",
            "四部分类": SIBU_MAP.get(sibu, sibu),
            "标题": name,
            "出处/作者": dynasty
        })
    return records

def collect_all_records():
    """收集所有内容"""
    all_records = []
    
    # 名句
    mingju_dir = BASE / "mingju"
    for sibu in ["jing", "shi", "zi", "ji"]:
        sibu_dir = mingju_dir / sibu
        if not sibu_dir.exists():
            continue
        for md_file in sibu_dir.glob("*.md"):
            if md_file.name == "README.md":
                continue
            content = md_file.read_text(encoding="utf-8")
            records = parse_mingju_content(content, sibu)
            all_records.extend(records)
            print(f"名句 {sibu}/{md_file.stem}: {len(records)} 条")
    
    # 典故
    diangu_dir = BASE / "diangu"
    for sibu in ["jing", "shi", "zi", "ji"]:
        sibu_dir = diangu_dir / sibu
        if not sibu_dir.exists():
            continue
        for md_file in sibu_dir.glob("*.md"):
            if md_file.name == "README.md":
                continue
            content = md_file.read_text(encoding="utf-8")
            records = parse_diangu_content(content, sibu)
            all_records.extend(records)
            print(f"典故 {sibu}/{md_file.stem}: {len(records)} 条")
    
    # 作者
    zuozhe_dir = BASE / "zuozhe"
    for sibu in ["jing", "shi", "zi", "ji"]:
        sibu_dir = zuozhe_dir / sibu
        if not sibu_dir.exists():
            continue
        for md_file in sibu_dir.glob("*.md"):
            if md_file.name == "README.md":
                continue
            content = md_file.read_text(encoding="utf-8")
            records = parse_zuozhe_content(content, sibu)
            all_records.extend(records)
            print(f"作者 {sibu}/{md_file.stem}: {len(records)} 条")
    
    return all_records

if __name__ == "__main__":
    records = collect_all_records()
    print(f"\n总计: {len(records)} 条记录")
    # 保存到 JSON 供后续调用 API
    output = {
        "app_token": APP_TOKEN,
        "table_id": TABLE_ID,
        "records": records
    }
    with open("/home/node/.openclaw/workspace-guo/guoxue-static/parsed_records.json", "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    print("已保存到 parsed_records.json")