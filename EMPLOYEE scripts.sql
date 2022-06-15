
/*
DROP TABLE EMPLOYEE_SICKDAY
DROP TABLE EMPLOYEE
DROP TABLE EMPLOYEE_TYPE
*/

CREATE TABLE [dbo].[EMPLOYEE_TYPE] (
	[ID] [int] IDENTITY (1, 1) NOT NULL,
	[name] [varchar] (128) NOT NULL,
	[active] [char] (1) NOT NULL 
) ON [PRIMARY]
GO


CREATE TABLE [dbo].[EMPLOYEE] (
	[ID] [int] IDENTITY (1, 1) NOT NULL,
	[EMPLOYEE_TYPE_ID] [int] NULL,
	[first_name] [varchar] (128) NULL,
	[last_name] [varchar] (128) NULL,
	[email_address] [varchar] (128) NULL,
	[phone_number] [varchar] (32) NULL,
	[active] [char] (1) NOT NULL 
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[EMPLOYEE_SICKDAY] (
	[ID] [int] IDENTITY (1, 1) NOT NULL,
	[EMPLOYEE_ID] [int] NULL,
	[sick_date] [datetime] NULL,
	[active] [char] (1) NOT NULL 
) ON [PRIMARY]
GO


ALTER TABLE [dbo].[EMPLOYEE_TYPE] WITH NOCHECK ADD 
	CONSTRAINT [PK_EMPLOYEE_TYPE] PRIMARY KEY CLUSTERED ([ID]) ON [PRIMARY]
GO
ALTER TABLE [dbo].[EMPLOYEE_TYPE] WITH NOCHECK ADD 
	CONSTRAINT [DF_EMPLOYEE_TYPE_active] DEFAULT ('Y') FOR [active] 
GO


ALTER TABLE [dbo].[EMPLOYEE] WITH NOCHECK ADD 
	CONSTRAINT [PK_EMPLOYEE] PRIMARY KEY CLUSTERED ([ID]) ON [PRIMARY]
GO
ALTER TABLE [dbo].[EMPLOYEE] WITH NOCHECK ADD 
	CONSTRAINT [FK_EMPLOYEE_EMPLOYEE_TYPE] FOREIGN KEY ([EMPLOYEE_TYPE_ID]) REFERENCES [dbo].[EMPLOYEE_TYPE] ([ID]),
	CONSTRAINT [DF_EMPLOYEE_active] DEFAULT ('Y') FOR [active] 
GO

ALTER TABLE [dbo].[EMPLOYEE_SICKDAY] WITH NOCHECK ADD 
	CONSTRAINT [PK_EMPLOYEE_SICKDAY] PRIMARY KEY CLUSTERED ([ID]) ON [PRIMARY]
GO
ALTER TABLE [dbo].[EMPLOYEE_SICKDAY] WITH NOCHECK ADD 
	CONSTRAINT [FK_EMPLOYEE_SICKDAY_EMPLOYEE] FOREIGN KEY ([EMPLOYEE_ID]) REFERENCES [dbo].[EMPLOYEE] ([ID]),
	CONSTRAINT [DF_EMPLOYEE_SICKDAY_active] DEFAULT ('Y') FOR [active] 
GO


-- initial data
INSERT INTO EMPLOYEE_TYPE (name) VALUES ('Full-time')
INSERT INTO EMPLOYEE_TYPE (name) VALUES ('Part-time')

INSERT INTO EMPLOYEE (EMPLOYEE_TYPE_ID, first_name, last_name, email_address, phone_number) VALUES ('1', 'John', 'Doe', 'john.doe@email.com', '6049876543')
INSERT INTO EMPLOYEE (EMPLOYEE_TYPE_ID, first_name, last_name, email_address, phone_number) VALUES ('2', 'Jane', 'Smith', 'janesmith@tech.com', '7781234567')


INSERT INTO EMPLOYEE_SICKDAY (EMPLOYEE_ID, sick_date) VALUES ('1', '2022-02-08')
INSERT INTO EMPLOYEE_SICKDAY (EMPLOYEE_ID, sick_date) VALUES ('2', '2022-03-13')
INSERT INTO EMPLOYEE_SICKDAY (EMPLOYEE_ID, sick_date) VALUES ('1', '2022-04-25')
INSERT INTO EMPLOYEE_SICKDAY (EMPLOYEE_ID, sick_date) VALUES ('1', '2022-05-05')