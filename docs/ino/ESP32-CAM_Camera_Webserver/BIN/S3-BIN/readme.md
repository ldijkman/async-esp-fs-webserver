esptool --chip esp32 merge_bin \
  -o merged-firmware.bin \
  --flash_mode dio \
  --flash_freq 40m \
  --flash_size 4MB \
  0x1000 bootloader.bin \
  0x8000 partitions.bin \
  0xe000 boot.bin \
  0x10000 your_app.bin
