from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import os
import re


def scrape_youtube_playlist_selenium(playlist_url, notes_name, source_code_url=None):
    options = Options()
    options.add_argument('--headless')  # Optional: run in headless mode

    # Initialize Chrome WebDriver with Service
    service = ChromeService(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)

    driver.get(playlist_url)

    video_titles = []
    video_ids = []

    # Scroll to load more videos if needed (adjust range as necessary)
    for _ in range(10):  # Adjust this value based on the number of videos in the playlist
        driver.execute_script(
            "window.scrollTo(0, document.documentElement.scrollHeight);")

    # Extracting video titles and IDs
    videos = driver.find_elements(
        By.CSS_SELECTOR, 'ytd-playlist-video-renderer')
    for video in videos:
        title = video.find_element(By.ID, 'video-title').text
        video_url = video.find_element(
            By.ID, 'video-title').get_attribute('href')
        video_id = video_url.split('?v=')[1].split('&')[0]
        video_titles.append(title)
        video_ids.append(video_id)

    driver.quit()

    # Create notes folder one level up from the script location
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    notes_dir = os.path.join(parent_dir, '..', 'notes', notes_name)
    os.makedirs(notes_dir, exist_ok=True)

    # Generate Markdown files for each video
    for index, (title, video_id) in enumerate(zip(video_titles, video_ids), start=1):
        formatted_title = format_title(title)
        sanitized_title = sanitize_title(formatted_title)
        file_path = os.path.join(notes_dir, f"{index}. {sanitized_title}.md")

        markdown_content = generate_markdown(
            formatted_title, video_id, source_code_url, index)

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(markdown_content)

        print(f"Markdown file created for: {title}")


# this function is used to format the title of the video by removing any extra characters after the pipe symbol


def format_title(title):
    return title.split('|')[0].replace('in Nepali', '').strip()

# this function is used to sanitize the title of the video by removing any special characters and replacing spaces with hyphens which is used in the markdown file name and url


def sanitize_title(title):
    title = format_title(title)
    sanitized = re.sub(r'[<>:"/\\|?*(),]+', '',
                       title.lower()).replace(' ', '-').replace('in Nepali', '').strip()
    return sanitized[:150]  # Limit the length to 150 characters


def generate_markdown(title, video_id, source_code_url, sidebar_position):
    source_code_section = f"\n\n## Source Code\n\n- [**Github**]({source_code_url})" if source_code_url else ''
    return f"""---
title: {title}
sidebar_position: {sidebar_position}
---

import YouTubeEmbed from '../../src/components/YoutubeEmbed';

# {title}

<YouTubeEmbed videoId="{video_id}" />{source_code_section}
"""


def main():
    print("** WARNING : Make sure not to overridde the existing notes with scripts. **")
    playlist_url = input("Enter the YouTube playlist URL: ").strip()
    notes_name = input("Enter the name for the notes folder: ").strip()
    source_code_url = input(
        "Enter the optional source code URL (press Enter to skip): ").strip()
    source_code_url = source_code_url if source_code_url else None

    scrape_youtube_playlist_selenium(playlist_url, notes_name, source_code_url)


if __name__ == '__main__':
    main()
