/*
 Navicat Premium Data Transfer

 Source Server         : mysql8
 Source Server Type    : MySQL
 Source Server Version : 80032 (8.0.32)
 Source Host           : localhost:3306
 Source Schema         : nestjs

 Target Server Type    : MySQL
 Target Server Version : 80032 (8.0.32)
 File Encoding         : 65001

 Date: 20/08/2023 13:14:52
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_permission
-- ----------------------------
DROP TABLE IF EXISTS `t_permission`;
CREATE TABLE `t_permission`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'ID主键',
  `permission_name` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '权限名称',
  `iden` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '权限标识',
  `desc` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '权限描述',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_0c3b2d1a64c4b8168827c2ad29`(`iden` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_permission
-- ----------------------------
INSERT INTO `t_permission` VALUES ('04cf59ee-3ecf-4ae0-bf6c-fe98c8c1d27c', 'ccc', 'ccc', 'ccc');
INSERT INTO `t_permission` VALUES ('33a8ddfe-05d3-4467-b7fc-2859219620a7', 'bbb', 'bbb', 'bbb');
INSERT INTO `t_permission` VALUES ('f59b5597-a1b8-4c4c-99ff-0c4e7be7ec2b', 'aaa', 'aaa', 'aaa');

-- ----------------------------
-- Table structure for t_role
-- ----------------------------
DROP TABLE IF EXISTS `t_role`;
CREATE TABLE `t_role`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'ID主键',
  `rolename` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '角色名称',
  `desc` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '角色描述',
  `iden` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '角色标识',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_d17c5976fa7e05fb0727edf878`(`iden` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_role
-- ----------------------------
INSERT INTO `t_role` VALUES ('507fffdd-0d36-4f67-8c35-8cbe9e0ec896', '超级管理员', '拥有所有权限', 'superAdmin');
INSERT INTO `t_role` VALUES ('713d65fa-5594-436b-9e7b-8a181a0e43c3', '普通用户', '拥有个别权限', 'user');

-- ----------------------------
-- Table structure for t_role_permission
-- ----------------------------
DROP TABLE IF EXISTS `t_role_permission`;
CREATE TABLE `t_role_permission`  (
  `tRoleId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `tPermissionId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`tRoleId`, `tPermissionId`) USING BTREE,
  INDEX `IDX_521242cb20fce7ff2c64ad5b29`(`tRoleId` ASC) USING BTREE,
  INDEX `IDX_cca5bbef6f1359da1a1450484b`(`tPermissionId` ASC) USING BTREE,
  CONSTRAINT `FK_521242cb20fce7ff2c64ad5b296` FOREIGN KEY (`tRoleId`) REFERENCES `t_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_cca5bbef6f1359da1a1450484ba` FOREIGN KEY (`tPermissionId`) REFERENCES `t_permission` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_role_permission
-- ----------------------------
INSERT INTO `t_role_permission` VALUES ('507fffdd-0d36-4f67-8c35-8cbe9e0ec896', '33a8ddfe-05d3-4467-b7fc-2859219620a7');
INSERT INTO `t_role_permission` VALUES ('507fffdd-0d36-4f67-8c35-8cbe9e0ec896', 'f59b5597-a1b8-4c4c-99ff-0c4e7be7ec2b');
INSERT INTO `t_role_permission` VALUES ('713d65fa-5594-436b-9e7b-8a181a0e43c3', '04cf59ee-3ecf-4ae0-bf6c-fe98c8c1d27c');
INSERT INTO `t_role_permission` VALUES ('713d65fa-5594-436b-9e7b-8a181a0e43c3', '33a8ddfe-05d3-4467-b7fc-2859219620a7');
INSERT INTO `t_role_permission` VALUES ('713d65fa-5594-436b-9e7b-8a181a0e43c3', 'f59b5597-a1b8-4c4c-99ff-0c4e7be7ec2b');

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'ID主键',
  `username` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名',
  `password` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `nickName` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '昵称',
  `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `status` tinyint NOT NULL DEFAULT 0 COMMENT '状态 0: 正常, 1: 禁用, 2:删除',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_cebdcd668896f79744000f50dd`(`username` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES ('3f2244fb-7680-4cec-8794-bbae5b4c5625', '王五', '123456', NULL, '2023-08-18 16:18:29.081179', '2023-08-18 16:25:44.159758', 0);
INSERT INTO `t_user` VALUES ('bd48b6c5-bc7a-4a98-b358-3b61d463a679', '张三1111', '123456', NULL, '2023-08-18 16:18:29.081179', '2023-08-18 16:25:44.159758', 0);
INSERT INTO `t_user` VALUES ('f175d310-f26b-4f72-8773-2d25c92c7414', '李四', '123456', NULL, '2023-08-18 16:18:29.081179', '2023-08-18 16:25:44.159758', 0);

-- ----------------------------
-- Table structure for t_user_role
-- ----------------------------
DROP TABLE IF EXISTS `t_user_role`;
CREATE TABLE `t_user_role`  (
  `tUserId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `tRoleId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`tUserId`, `tRoleId`) USING BTREE,
  INDEX `IDX_217d24eaf388a07851df511bee`(`tUserId` ASC) USING BTREE,
  INDEX `IDX_df1bd90000a679723972611199`(`tRoleId` ASC) USING BTREE,
  CONSTRAINT `FK_217d24eaf388a07851df511beed` FOREIGN KEY (`tUserId`) REFERENCES `t_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_df1bd90000a6797239726111996` FOREIGN KEY (`tRoleId`) REFERENCES `t_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_user_role
-- ----------------------------
INSERT INTO `t_user_role` VALUES ('3f2244fb-7680-4cec-8794-bbae5b4c5625', '507fffdd-0d36-4f67-8c35-8cbe9e0ec896');
INSERT INTO `t_user_role` VALUES ('3f2244fb-7680-4cec-8794-bbae5b4c5625', '713d65fa-5594-436b-9e7b-8a181a0e43c3');
INSERT INTO `t_user_role` VALUES ('bd48b6c5-bc7a-4a98-b358-3b61d463a679', '507fffdd-0d36-4f67-8c35-8cbe9e0ec896');
INSERT INTO `t_user_role` VALUES ('bd48b6c5-bc7a-4a98-b358-3b61d463a679', '713d65fa-5594-436b-9e7b-8a181a0e43c3');
INSERT INTO `t_user_role` VALUES ('f175d310-f26b-4f72-8773-2d25c92c7414', '713d65fa-5594-436b-9e7b-8a181a0e43c3');

SET FOREIGN_KEY_CHECKS = 1;
