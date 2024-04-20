esptool.py --chip esp32 merge_bin \
  -o merged-firmware.bin \
  --flash_mode qio \
  --flash_freq 80m \
  --flash_size 8MB \
  0x1000 ESP32-CAM_MJPEG2SD_S3_Wroom.ino.bootloader.bin \
  0x8000 ESP32-CAM_MJPEG2SD_S3_Wroom.ino.partitions.bin \
  0xe000 boot.bin \
  0x10000 ESP32-CAM_MJPEG2SD_S3_Wroom.ino.bin


