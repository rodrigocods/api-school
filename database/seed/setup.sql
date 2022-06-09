INSERT INTO public.school VALUES(1, 'Name of school, change in settings');

INSERT INTO public.permission VALUES(1, 'Get information from school', '/school', 'GET');
INSERT INTO public.permission VALUES(2, 'Edit information from school', '/school/:schoolID', 'PUT');

INSERT INTO public.permission VALUES(3, 'Create a student', '/student', 'POST');
INSERT INTO public.permission VALUES(4, 'Get information from students', '/student', 'GET');
INSERT INTO public.permission VALUES(5, 'Edit information from a student', '/student/:studentID', 'PUT');
INSERT INTO public.permission VALUES(6, 'Get information from a student', '/student/:studentID', 'GET');
INSERT INTO public.permission VALUES(7, 'Delete a student', '/student/:studentID', 'DELETE');

INSERT INTO public.permission VALUES(8, 'Create a class', '/schoolClass', 'POST');
INSERT INTO public.permission VALUES(9, 'Get information from classes', '/schoolClass', 'GET');
INSERT INTO public.permission VALUES(10, 'Edit information from a class', '/schoolClass/:schoolClassID', 'PUT');
INSERT INTO public.permission VALUES(11, 'Get information from a class', '/schoolClass/:schoolClassID', 'GET');
INSERT INTO public.permission VALUES(12, 'Delete a class', '/schoolClass/:studentID', 'DELETE');

INSERT INTO public.permission VALUES(13, 'Create a teacher', '/teacher', 'POST');
INSERT INTO public.permission VALUES(14, 'Get information from teachers', '/teacher', 'GET');
INSERT INTO public.permission VALUES(15, 'Edit information from a teacher', '/teacher/:teacherID', 'PUT');
INSERT INTO public.permission VALUES(16, 'Get information from a teacher', '/teacher/:teacherID', 'GET');
INSERT INTO public.permission VALUES(17, 'Delete a teacher', '/teacher/:teacherID', 'DELETE');

INSERT INTO public.permission VALUES(18, 'Create a registration', '/registration', 'POST');
INSERT INTO public.permission VALUES(19, 'Get information from registrations', '/registration/', 'GET');
INSERT INTO public.permission VALUES(20, 'Edit information from a registration', '/registration/:registrationID', 'PUT');
INSERT INTO public.permission VALUES(21, 'Get information from a registration', '/registration/:registrationID', 'GET');
INSERT INTO public.permission VALUES(22, 'Delete a registration', '/registration/:registrationID', 'DELETE');

INSERT INTO public.user_group VALUES(1, 'Administrator');

INSERT INTO public.user VALUES(1, 'Administrator', 'admin@admin', '4586f9ab6fc3f75568dbf1e8e57549a1f0c21ec571698a0f1138b51587bb54df', 1);

INSERT INTO public.user_group_has_permission VALUES(1, 1, 1, 'true');
INSERT INTO public.user_group_has_permission VALUES(2, 1, 2, 'true');
INSERT INTO public.user_group_has_permission VALUES(3, 1, 3, 'true');
INSERT INTO public.user_group_has_permission VALUES(4, 1, 4, 'true');
INSERT INTO public.user_group_has_permission VALUES(5, 1, 5, 'true');
INSERT INTO public.user_group_has_permission VALUES(6, 1, 6, 'true');
INSERT INTO public.user_group_has_permission VALUES(7, 1, 7, 'true');
INSERT INTO public.user_group_has_permission VALUES(8, 1, 8, 'true');
INSERT INTO public.user_group_has_permission VALUES(9, 1, 9, 'true');
INSERT INTO public.user_group_has_permission VALUES(10, 1, 10, 'true');
INSERT INTO public.user_group_has_permission VALUES(11, 1, 11, 'true');
INSERT INTO public.user_group_has_permission VALUES(12, 1, 12, 'true');
INSERT INTO public.user_group_has_permission VALUES(13, 1, 13, 'true');
INSERT INTO public.user_group_has_permission VALUES(14, 1, 14, 'true');
INSERT INTO public.user_group_has_permission VALUES(15, 1, 15, 'true');
INSERT INTO public.user_group_has_permission VALUES(16, 1, 16, 'true');
INSERT INTO public.user_group_has_permission VALUES(17, 1, 17, 'true');
INSERT INTO public.user_group_has_permission VALUES(18, 1, 18, 'true');
INSERT INTO public.user_group_has_permission VALUES(19, 1, 19, 'true');
INSERT INTO public.user_group_has_permission VALUES(20, 1, 20, 'true');
INSERT INTO public.user_group_has_permission VALUES(21, 1, 21, 'true');
INSERT INTO public.user_group_has_permission VALUES(22, 1, 22, 'true');
