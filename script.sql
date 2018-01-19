create database ShopDoAn
GO
USE [ShopDoAn]
GO
/****** Object:  StoredProcedure [dbo].[getInforUser]    Script Date: 1/19/2018 12:30:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getInforUser]
	@Id int
AS
BEGIN
	select * from [User] where ID=@Id
END

GO
/****** Object:  StoredProcedure [dbo].[insertOrder]    Script Date: 1/19/2018 12:30:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[insertOrder]
	@input varchar(200),
	@idUser int
AS
BEGIN
	declare @idOrder int;
	insert into [Order]  (IdUser,TotalPrice) values (@idUser,0)
	SELECT @idOrder= CAST(scope_identity() AS int)

END

GO
/****** Object:  StoredProcedure [dbo].[selectUserFromId]    Script Date: 1/19/2018 12:30:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[selectUserFromId]
	@Id int
AS
BEGIN
	select * from [User] where  ID=@Id
END

GO
/****** Object:  StoredProcedure [dbo].[usp_HaoHt_addFood]    Script Date: 1/19/2018 12:30:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[usp_HaoHt_addFood]
	-- Add the parameters for the stored procedure here
	@Name nvarchar(200),
	@OldPrice bigint,
	@NewPrice bigint,
	@Url varchar(200)
	AS
BEGIN
	insert into Food (Name,OldPrice,NewPrice,CountRate,Rate,Url) values (@Name,@OldPrice,@NewPrice,0,0,@Url)
END

GO
/****** Object:  StoredProcedure [dbo].[usp_HaoHt_Food_selectAll]    Script Date: 1/19/2018 12:30:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[usp_HaoHt_Food_selectAll]

AS
BEGIN
	select * from Food
END

GO
/****** Object:  StoredProcedure [dbo].[usp_HaoHt_getAllOrder]    Script Date: 1/19/2018 12:30:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[usp_HaoHt_getAllOrder] 
	@IdUser int
AS
BEGIN
	select * from [Order] where IdUser=@IdUser
END

GO
/****** Object:  StoredProcedure [dbo].[usp_HaoHt_insertOrder]    Script Date: 1/19/2018 12:30:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[usp_HaoHt_insertOrder] 
	@inputStr nvarchar(max),
	@idUser int,
	@address nvarchar(200),
	@phoneNumber nvarchar(12)
AS
BEGIN
	declare @idOrder int;
	insert into [Order]  (IdUser,TotalPrice,[Address],PhoneNumber) values (@idUser,0,@address,@phoneNumber)
	SELECT @idOrder= CAST(scope_identity() AS int)
	DECLARE db_cursor CURSOR FOR SELECT Field FROM dbo.splitstring(@inputStr,';'); 
	DECLARE @AgentStr NVARCHAR(Max);
	OPEN db_cursor;
	FETCH NEXT FROM db_cursor INTO @AgentStr;
	WHILE @@FETCH_STATUS = 0  
	BEGIN  
			declare @IdFood int =(SELECT Field FROM (
			  SELECT
				ROW_NUMBER()OVER (ORDER BY (SELECT 1))  AS rownumber,
				Field
			  FROM dbo.splitstring(@AgentStr,',')
			) as foo
			WHERE rownumber = 1)


			declare @Count nvarchar(10) =(SELECT Field FROM (
			  SELECT
				ROW_NUMBER()OVER (ORDER BY (SELECT 1)) AS rownumber,
				Field
			  FROM dbo.splitstring(@AgentStr,',')
			) as foo
			WHERE rownumber = 2)
			insert into OrderDetail(IdOrder,IdFood,[Count],TotalPrice) values (@idOrder,@IdFood,@Count,(Select NewPrice from Food where Id=@IdFood)*@Count)

		   FETCH NEXT FROM db_cursor INTO @AgentStr;
	END;
	CLOSE db_cursor;
	DEALLOCATE db_cursor;
	 
END

GO
/****** Object:  StoredProcedure [dbo].[usp_HaoHt_InsertTrangThaiUser]    Script Date: 1/19/2018 12:30:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[usp_HaoHt_InsertTrangThaiUser] 
	@inputStr nvarchar(max),
	@idUser int
AS
BEGIN
	declare @idOrder int;
	insert into [Order]  (IdUser,TotalPrice) values (@idUser,0)
	SELECT @idOrder= CAST(scope_identity() AS int)
	DECLARE db_cursor CURSOR FOR SELECT Field FROM dbo.splitstring(@inputStr,';'); 
	DECLARE @AgentStr NVARCHAR(Max);
	OPEN db_cursor;
	FETCH NEXT FROM db_cursor INTO @AgentStr;
	WHILE @@FETCH_STATUS = 0  
	BEGIN  
			declare @IdFood int =(SELECT Field FROM (
			  SELECT
				ROW_NUMBER()OVER (ORDER BY (SELECT 1))  AS rownumber,
				Field
			  FROM dbo.splitstring(@AgentStr,',')
			) as foo
			WHERE rownumber = 1)


			declare @Count nvarchar(10) =(SELECT Field FROM (
			  SELECT
				ROW_NUMBER()OVER (ORDER BY (SELECT 1)) AS rownumber,
				Field
			  FROM dbo.splitstring(@AgentStr,',')
			) as foo
			WHERE rownumber = 2)
			insert into OrderDetail(IdOrder,IdFood,[Count],TotalPrice) values (@idOrder,@IdFood,@Count,(Select NewPrice from Food where Id=@IdFood)*@Count)

		   FETCH NEXT FROM db_cursor INTO @AgentStr;
	END;
	CLOSE db_cursor;
	DEALLOCATE db_cursor;
	 
END

GO
/****** Object:  StoredProcedure [dbo].[usp_HaoHt_User_CheckUserLogin]    Script Date: 1/19/2018 12:30:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[usp_HaoHt_User_CheckUserLogin]
	-- Add the parameters for the stored procedure here
	@email varchar(200),
	@password varchar(200)
	AS
BEGIN
	select id,isActive from [User] where email=email and [Password]=@password;
END

GO
/****** Object:  StoredProcedure [dbo].[usp_HaoHt_User_Register]    Script Date: 1/19/2018 12:30:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[usp_HaoHt_User_Register] 
	-- Add the parameters for the stored procedure here
	@email varchar(200),
	@password varchar(200),
	@name nvarchar(200)
	AS
BEGIN
	if(not exists(select id from [User] where email=@email))
	begin
		insert into [User] (email,[Password],Name,Code,isActive) OUTPUT Inserted.ID,Inserted.Code,Inserted.Name values (@email,@password,@name,FLOOR(RAND(CHECKSUM(NEWID()))*(9999-1000)+1000),0)
	end
	else 
	begin
		select 0 as ID
	end
END

GO
/****** Object:  StoredProcedure [dbo].[usp_HaoHt_User_VerifyUser]    Script Date: 1/19/2018 12:30:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
create PROCEDURE [dbo].[usp_HaoHt_User_VerifyUser] 
	-- Add the parameters for the stored procedure here
	@id int,
	@code int
	AS
BEGIN
	if(exists(select * from [User] where ID=@id and Code=@code))
	begin
		update [User] set isActive=1 where ID=@id and Code=@code
		select @id as value
	end
	else
	begin
		select 0 as value
	end
END

GO
/****** Object:  UserDefinedFunction [dbo].[splitstring]    Script Date: 1/19/2018 12:30:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[splitstring] ( @stringToSplit VARCHAR(MAX),@Regex varchar(10) )
RETURNS
 @returnList TABLE ([Field] [nvarchar] (500))
AS
BEGIN

 DECLARE @name NVARCHAR(255)
 DECLARE @pos INT

 WHILE CHARINDEX(@Regex, @stringToSplit) > 0
 BEGIN
  SELECT @pos  = CHARINDEX(@Regex, @stringToSplit)  
  SELECT @name = SUBSTRING(@stringToSplit, 1, @pos-1)

  INSERT INTO @returnList 
  SELECT @name

  SELECT @stringToSplit = SUBSTRING(@stringToSplit, @pos+1, LEN(@stringToSplit)-@pos)
 END

 INSERT INTO @returnList
 SELECT @stringToSplit

 RETURN
END
GO
/****** Object:  Table [dbo].[Food]    Script Date: 1/19/2018 12:30:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Food](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](150) NULL,
	[OldPrice] [bigint] NULL,
	[NewPrice] [bigint] NULL,
	[CountRate] [int] NULL,
	[Rate] [float] NULL,
	[Url] [varchar](250) NULL,
	[Description] [nvarchar](250) NULL,
 CONSTRAINT [PK_Food] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Order]    Script Date: 1/19/2018 12:30:39 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Order](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IdUser] [int] NULL,
	[TotalPrice] [bigint] NULL,
	[GiftCode] [varchar](50) NULL,
	[isReceive] [bit] NULL CONSTRAINT [DF_Order_isReceive]  DEFAULT ((0)),
	[isShipping] [bit] NULL CONSTRAINT [DF_Order_isShipping]  DEFAULT ((0)),
	[Address] [nvarchar](150) NULL,
	[PhoneNumber] [varchar](50) NULL,
	[isCancle] [bit] NULL CONSTRAINT [DF_Order_isCancle]  DEFAULT ((0)),
 CONSTRAINT [PK_Order] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[OrderDetail]    Script Date: 1/19/2018 12:30:39 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderDetail](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IdOrder] [int] NULL,
	[IdFood] [int] NULL,
	[Count] [int] NULL,
	[TotalPrice] [bigint] NULL,
 CONSTRAINT [PK_OrderDetail] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[User]    Script Date: 1/19/2018 12:30:39 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[User](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[email] [varchar](150) NULL,
	[Name] [nvarchar](150) NULL,
	[Password] [nvarchar](50) NULL,
	[Code] [int] NULL,
	[isActive] [bit] NULL,
	[Address] [nvarchar](250) NULL,
	[PhoneNumber] [varchar](50) NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[Food] ON 

INSERT [dbo].[Food] ([Id], [Name], [OldPrice], [NewPrice], [CountRate], [Rate], [Url], [Description]) VALUES (120, N'Mỳ xào bò', 45000, 43000, 0, 5, N'http://res.cloudinary.com/dumfykuvl/image/upload/v1489778124/myxaobo_q1hwk3.png', N'Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
INSERT [dbo].[Food] ([Id], [Name], [OldPrice], [NewPrice], [CountRate], [Rate], [Url], [Description]) VALUES (121, N'Khoai tây chiên', 30000, 27000, 0, 5, N'http://res.cloudinary.com/dumfykuvl/image/upload/v1489898513/khoai-tay-chien-1_jzp9i4.jpg', N'Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
INSERT [dbo].[Food] ([Id], [Name], [OldPrice], [NewPrice], [CountRate], [Rate], [Url], [Description]) VALUES (122, N'Cơm rang dưa bò', 45000, 43000, 0, 5, N'http://res.cloudinary.com/dumfykuvl/image/upload/v1489778120/comrangduabo_gmmpdg.png', N'Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
INSERT [dbo].[Food] ([Id], [Name], [OldPrice], [NewPrice], [CountRate], [Rate], [Url], [Description]) VALUES (123, N'Cơm rang đùi cay', 45000, 43000, 0, 5, N'http://res.cloudinary.com/dumfykuvl/image/upload/v1489778119/comrangduimat_dzoyrh.png', N'Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
INSERT [dbo].[Food] ([Id], [Name], [OldPrice], [NewPrice], [CountRate], [Rate], [Url], [Description]) VALUES (124, N'Cơm rang thập cẩm', 45000, 43000, 0, 5, N'http://res.cloudinary.com/dumfykuvl/image/upload/v1489898512/comrangthapcam_c07cmt.jpg', N'Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
INSERT [dbo].[Food] ([Id], [Name], [OldPrice], [NewPrice], [CountRate], [Rate], [Url], [Description]) VALUES (125, N'Đùi gà nướng mật', 30000, 30000, 0, 5, N'http://res.cloudinary.com/dumfykuvl/image/upload/v1489778129/nuongmat_xolbve.png', N'Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
INSERT [dbo].[Food] ([Id], [Name], [OldPrice], [NewPrice], [CountRate], [Rate], [Url], [Description]) VALUES (126, N'Đùi gà sốt cay', 30000, 30000, 0, 5, N'http://res.cloudinary.com/dumfykuvl/image/upload/v1489778124/sotcay_ffmzuv.png', N'Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
INSERT [dbo].[Food] ([Id], [Name], [OldPrice], [NewPrice], [CountRate], [Rate], [Url], [Description]) VALUES (127, N'Bò xào rau cải', 50000, 47000, 0, 5, N'http://res.cloudinary.com/dumfykuvl/image/upload/v1489778124/boxaocai_eoveo4.png', N'Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
INSERT [dbo].[Food] ([Id], [Name], [OldPrice], [NewPrice], [CountRate], [Rate], [Url], [Description]) VALUES (128, N'Dứa ướp cay ngọt', 25000, 25000, 0, 5, N'http://res.cloudinary.com/dumfykuvl/image/upload/v1489898512/duauopcayngot_zbuauh.jpg', N'Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
INSERT [dbo].[Food] ([Id], [Name], [OldPrice], [NewPrice], [CountRate], [Rate], [Url], [Description]) VALUES (129, N'Khoai lang chiên', 30000, 27000, 0, 5, N'http://res.cloudinary.com/dumfykuvl/image/upload/v1489898513/khoailangchien_ucsjra.jpg', N'Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
INSERT [dbo].[Food] ([Id], [Name], [OldPrice], [NewPrice], [CountRate], [Rate], [Url], [Description]) VALUES (130, N'Cơm rang bò xào dứa', 45000, 43000, 0, 5, N'http://res.cloudinary.com/dumfykuvl/image/upload/v1489898513/comrangboxaodua_gnlibh.jpg', N'Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
INSERT [dbo].[Food] ([Id], [Name], [OldPrice], [NewPrice], [CountRate], [Rate], [Url], [Description]) VALUES (131, N'Xoài ướp cay ngọt', 25000, 25000, 0, 5, N'http://res.cloudinary.com/dumfykuvl/image/upload/v1489898513/xoaiuopcayngot_j0juxs.jpg', N'Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
INSERT [dbo].[Food] ([Id], [Name], [OldPrice], [NewPrice], [CountRate], [Rate], [Url], [Description]) VALUES (132, N'Dưa chuột chẻ', 20000, 20000, 0, 5, N'http://res.cloudinary.com/dumfykuvl/image/upload/v1489898513/duachuotche_qmprto.jpg', N'Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
INSERT [dbo].[Food] ([Id], [Name], [OldPrice], [NewPrice], [CountRate], [Rate], [Url], [Description]) VALUES (133, N'Cơm rang đùi gà nướng mật', 45000, 43000, 0, 5, N'http://res.cloudinary.com/dumfykuvl/image/upload/v1489778118/comrangdui_t9mnqi.png', N'Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
INSERT [dbo].[Food] ([Id], [Name], [OldPrice], [NewPrice], [CountRate], [Rate], [Url], [Description]) VALUES (134, N'Chân gà ngâm xả ớt', 60000, 56000, 0, 5, N'http://res.cloudinary.com/dumfykuvl/image/upload/v1489898512/chan-ga-ngam-sa-ot_e1jfi3.jpg', N'Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
INSERT [dbo].[Food] ([Id], [Name], [OldPrice], [NewPrice], [CountRate], [Rate], [Url], [Description]) VALUES (135, N'Nem chua rán', 7000, 7000, 0, 5, N'http://res.cloudinary.com/dumfykuvl/image/upload/v1489898515/nen_chua_ran_10_yb3hmj.jpg', N'Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
INSERT [dbo].[Food] ([Id], [Name], [OldPrice], [NewPrice], [CountRate], [Rate], [Url], [Description]) VALUES (136, N'Xúc xích rán', 15000, 15000, 0, 5, N'http://res.cloudinary.com/dumfykuvl/image/upload/v1489898514/xucxichran_v4qeps.jpg', N'Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
SET IDENTITY_INSERT [dbo].[Food] OFF
SET IDENTITY_INSERT [dbo].[Order] ON 

INSERT [dbo].[Order] ([Id], [IdUser], [TotalPrice], [GiftCode], [isReceive], [isShipping], [Address], [PhoneNumber], [isCancle]) VALUES (12, 69, 210000, NULL, 1, 1, N'211 Khuong Trung', N'01686072083', NULL)
INSERT [dbo].[Order] ([Id], [IdUser], [TotalPrice], [GiftCode], [isReceive], [isShipping], [Address], [PhoneNumber], [isCancle]) VALUES (13, 69, 178000, NULL, 1, 0, N'211 Khuong Trung', N'01686072083', NULL)
SET IDENTITY_INSERT [dbo].[Order] OFF
SET IDENTITY_INSERT [dbo].[OrderDetail] ON 

INSERT [dbo].[OrderDetail] ([Id], [IdOrder], [IdFood], [Count], [TotalPrice]) VALUES (51, 12, 121, 3, 81000)
INSERT [dbo].[OrderDetail] ([Id], [IdOrder], [IdFood], [Count], [TotalPrice]) VALUES (52, 12, 122, 3, 129000)
INSERT [dbo].[OrderDetail] ([Id], [IdOrder], [IdFood], [Count], [TotalPrice]) VALUES (53, 13, 121, 5, 135000)
INSERT [dbo].[OrderDetail] ([Id], [IdOrder], [IdFood], [Count], [TotalPrice]) VALUES (54, 13, 122, 1, 43000)
SET IDENTITY_INSERT [dbo].[OrderDetail] OFF
SET IDENTITY_INSERT [dbo].[User] ON 

INSERT [dbo].[User] ([ID], [email], [Name], [Password], [Code], [isActive], [Address], [PhoneNumber]) VALUES (69, N'tranhaockpt@gmail.com', N'Hảo', N'25d55ad283aa400af464c76d713c07ad', 9785, 1, N'211 Khuong Trung', N'01686072083')
SET IDENTITY_INSERT [dbo].[User] OFF
