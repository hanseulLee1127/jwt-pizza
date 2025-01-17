# Learning notes

## JWT Pizza code study and debugging

As part of `Deliverable ⓵ Development deployment: JWT Pizza`, start up the application and debug through the code until you understand how it works. During the learning process fill out the following required pieces of information in order to demonstrate that you have successfully completed the deliverable.

| User activity                                       | Frontend component | Backend endpoints | Database SQL |
| --------------------------------------------------- | ------------------ | ----------------- | ------------ |
| View home page                                      |home.jsx,view.tsx	                    |None                   |none              |
| Register new user<br/>(t@jwt.com, pw: test)         |register.jsx	                    |[POST] /api/auth		                   |INSERT INTO user (name, email, password) VALUES (?, ?, ?);
INSERT INTO userRole (userId, role, objectId) VALUES (?, ?, ?);              |
| Login new user<br/>(t@jwt.com, pw: test)            |login.tsx	                    |[PUT] /api/auth		                   |SELECT * FROM user WHERE email=?
SELECT * FROM userRole WHERE userId=?;              |
| Order pizza                                         |delivery.tsx	                    |[POST] /api/order		                   |INSERT INTO dinerOrder (dinerId, franchiseId, storeId, date) VALUES (?, ?, ?, now());
INSERT INTO orderItem (orderId, menuId, description, price) VALUES (?, ?, ?, ?)              |
| Verify pizza                                        |menu.tsx	                    |[POST] /api/order	                   |SELECT * FROM orders WHERE id = ?;
SELECT * FROM orderItems WHERE orderId = ?;              |
| View profile page                                   |dinnerDashboard.tsx	                    |[GET] /api/order	                   |	SELECT * FROM orders WHERE userId = ? ORDER BY created_at DESC;              |
| View franchise<br/>(as diner)                       |frachiseDashboard.tsx	                    |[GET] /api/franchise/:userId	                   |SELECT * FROM franchises WHERE userId = ?;
SELECT * FROM stores WHERE franchiseId IN (SELECT id FROM franchises WHERE userId = ?);              |
| Logout                                              |home.jsx	                    |[DELETE] /api/auth	                   |DELETE FROM auth WHERE token=?|
| View About page                                     |about.tsx	                    |none                   |none              |
| View History page                                   |history.tsx	                    |none                   |none              |
| Login as franchisee<br/>(f@jwt.com, pw: franchisee) |frachiseDashboard.tsx	                    |[PUT] /api/auth	                   |SELECT * FROM user WHERE email = ? AND password = ?;
SELECT role FROM userRole WHERE userId = ?;              |
| View franchise<br/>(as franchisee)                  |dinerDashboard.tsx	                    |[GET] /api/franchise/:userId	                   |SELECT * FROM franchises WHERE userId = ?;
SELECT * FROM stores WHERE franchiseId IN (SELECT id FROM franchises WHERE userId = ?);              |
| Create a store                                      |createstore.tsx	                    |[POST] /api/franchise/:franchiseId/store	                   |INSERT INTO store (franchiseId, name) VALUES (?, ?);              |
| Close a store                                       |closestore.tsx	                    |[DELETE] /api/franchise/:franchiseId/store/:storeId	                   |DELETE FROM store WHERE franchiseId=? AND id=?              |
| Login as admin<br/>(a@jwt.com, pw: admin)           |adminDashboard.tsx	                    |[PUT] /api/auth	                   |SELECT * FROM user WHERE email = ? AND password = ?;
SELECT role FROM userRole WHERE userId = ?;              |
| View Admin page                                     |adminDashBoard.tsx	                    |[GET] /api/franchise	                   |SELECT * FROM franchises;              |
| Create a franchise for t@jwt.com                    |createFranchise.tsx	                    |[POST] /api/franchise	                   |INSERT INTO franchises (name, created_at) VALUES (?, NOW());
INSERT INTO franchiseAdmins (franchiseId, userId) VALUES (LAST_INSERT_ID(), ?);              |
| Close the franchise for t@jwt.com                   |closeFranchise.tsx	                    |[DELETE] /api/franchise/:franchiseId	                   |DELETE FROM store WHERE franchiseId=?
DELETE FROM userRole WHERE objectId=?
DELETE FROM franchise WHERE id=?              |
