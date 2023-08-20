import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import Redis from "ioredis"

@Injectable()
export class CacheService {
  private readonly redisClient: Redis

  constructor(private readonly configService: ConfigService) {
    this.redisClient = new Redis({ ...configService.get("redis") })
  }

  // 在执行 SET 命令时，可以使用 SET 选项来设置额外的选项参数。其中一些常见的选项参数包括：
  //  - EX（Seconds）：设置键的过期时间，以秒为单位。
  //  - PX（Milliseconds）：设置键的过期时间，以毫秒为单位。
  //  - NX（NOT EXISTS）：仅在键不存在时设置键的值。
  //  - XX（EXISTS）：仅在键存在时设置键的值。


  /**
   * 永久存储
   * @param key 存储键名
   * @param value 存储值
   */
  async setValue(key: string, value: string) {
    return await this.redisClient.set(key, value)
  }

  /**
   * 设置键的过期时间，以毫秒为单位
   * 
   * @param key 存储键名
   * @param value 存储值
   * @param expire 过期时间、单位毫秒
   * @returns 
   */
  async setValueWithPx(key: string, value: string, expire: number) {
    return await this.redisClient.set(key, value, "PX", expire)
  }

  /**
   * 设置键的过期时间，以秒为单位
   * 
   * @param key 存储键名
   * @param value 存储值
   * @param expire 过期时间、单位秒
   * @returns 
   */
  async setValueWithEx(key: string, value: string, expire: number) {
    return await this.redisClient.set(key, value, "EX", expire)
  }

  /**
   * 仅在键不存在时设置键的值
   * 
   * @param key 存储键名
   * @param value 存储值
   * @returns 
   */
  async setValueWithNx(key: string, value: string) {
    return await this.redisClient.set(key, value, "KEEPTTL","NX")
  }

  /**
   * 仅在键存在时设置键的值
   * 
   * @param key 存储键名
   * @param value 存储值
   * @returns 
   */
  async setValueWithXx(key: string, value: string) {
    return await this.redisClient.set(key, value, "KEEPTTL","XX")
  }

  /**
   * 根据键删除值
   * 
   * @param key 键
   * @returns 删除了几个
   */
  async delValue(...key: string[]) {
    return await this.redisClient.del(...key)
  }

  /**
   * 根据键获取值
   * 
   * @param key 键
   * @returns 键对应的值
   */
  async getValue(key: string) {
    return await this.redisClient.get(key)
  }

  /**
   * 判断键是否存在
   * 
   * @param key 键
   * @returns 布尔值
   */
  async existsKey(...key: string[]) {
    return await this.redisClient.exists(...key)
  }
}
