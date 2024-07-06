const orderDetailTemplate = (orderBy: string, items: string[] , amount : string) => {
	return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>Order Details</title>
		<style>
			body {
				background-color: #ffffff;
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.4;
				color: #333333;
				margin: 0;
				padding: 0;
			}
	
			.container {
				max-width: 600px;
				margin: 0 auto;
				padding: 20px;
				text-align: center;
			}
	
			.logo {
				max-width: 200px;
				margin-bottom: 20px;
			}
	
			.message {
				font-size: 18px;
				font-weight: bold;
				margin-bottom: 20px;
			}
	
			.body {
				font-size: 16px;
				margin-bottom: 20px;
				text-align: left;
			}
	
			.cta {
				display: inline-block;
				padding: 10px 20px;
				background-color: #FFD60A;
				color: #000000;
				text-decoration: none;
				border-radius: 5px;
				font-size: 16px;
				font-weight: bold;
				margin-top: 20px;
			}
	
			.support {
				font-size: 14px;
				color: #999999;
				margin-top: 20px;
			}
	
			.highlight {
				font-weight: bold;
			}
	
			.items-list {
				margin-top: 20px;
				text-align: left;
			}
	
			.items-list ul {
				list-style-type: disc;
				padding-left: 20px;
			}
	
			.items-list li {
				margin-bottom: 10px;
			}
		</style>
	
	</head>
	
	<body>
		<div class="container">
			<img class="logo"
					src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion Logo">
			<div class="message">Order Details</div>
			<div class="body">
				<p>Dear ${orderBy},</p>
				<p>Thank you for your order with RPR Steel Works. Below are the details of the items you have ordered:</p>
				<div class="items-list">
					<ul>
						${items.map((item) => `<li>${item}</li>`).join('')}
					</ul>
				</div>
                <div>
                    <span>${amount}</span>
                </div>
				<p>If you have any questions or need assistance, please feel free to reach out to us at <a
						href="mailto:yugam.project.ltd@gmail.com">yugam.project.ltd@gmail.com</a>. We are here to help!</p>
			</div>
			<div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
					href="mailto:yugam.project.ltd@gmail.com">yugam.project.ltd@gmail.com</a>. We are here to help!</div>
		</div>
	</body>
	
	</html>`;
};

export default orderDetailTemplate;
