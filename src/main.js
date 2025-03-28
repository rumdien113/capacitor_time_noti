import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Share } from '@capacitor/share';
import html2canvas from 'html2canvas';

let timeInterval;
const timeElement = document.getElementById('currentTime');
const secondsElement = document.getElementById('seconds');

// Hàm cập nhật thời gian realtime
const updateClock = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    timeElement.textContent = `${hours}:${minutes}`;
    secondsElement.textContent = `${seconds} giây`;

    return `${hours}:${minutes}:${seconds}`;
};

// Khởi động đồng hồ
const startClock = () => {
    clearInterval(timeInterval);
    updateClock(); // Cập nhật ngay lập tức
    timeInterval = setInterval(updateClock, 1000);
};

// Hàm thông báo thời gian
const notifyTime = async () => {
    const timeString = updateClock();
    await LocalNotifications.schedule({
        notifications: [{
            title: "Thời gian hiện tại",
            body: timeString,
            id: 1
        }]
    });
};

// Hàm chia sẻ thời gian realtime
const shareTime = async () => {
    const timeString = updateClock();
    await Share.share({
        title: 'Thời gian hiện tại',
        text: `Thời gian chính xác: ${timeString}`,
        dialogTitle: 'Chia sẻ thời gian'
    });
};

// Hàm chụp màn hình, sử dụng html2canvas cho web và plugin capacitor-screenshot cho native
const takeScreenshot = async () => {
    try {
        const imageElement = document.getElementById('preview');

        if (Capacitor.getPlatform() === 'web') {
            // Sử dụng html2canvas cho web
            const element = document.body; // Có thể thay đổi thành phần bạn muốn chụp
            const canvas = await html2canvas(element);
            const dataUrl = canvas.toDataURL('image/png');
            imageElement.src = dataUrl;
            imageElement.style.display = 'block';
        } else {
            // Sử dụng dynamic import cho plugin capacitor-screenshot trên native (Android/iOS)
            const { screenshot } = await import('capacitor-screenshot');
            const result = await screenshot();
            imageElement.src = `data:image/png;base64,${result.value}`;
            imageElement.style.display = 'block';
        }
    } catch (error) {
        console.error('Lỗi chụp màn hình:', error);
    }
};

// Khởi tạo ứng dụng
document.addEventListener('DOMContentLoaded', () => {
    startClock();
    LocalNotifications.requestPermissions();

    // Gán sự kiện cho các nút
    document.getElementById('showTimeBtn').addEventListener('click', notifyTime);
    document.getElementById('shareTimeBtn').addEventListener('click', shareTime);
    document.getElementById('screenshotBtn').addEventListener('click', takeScreenshot);
});

// Dọn dẹp khi thoát app
window.addEventListener('beforeunload', () => {
    clearInterval(timeInterval);
});
