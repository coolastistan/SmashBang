%% Fidget spinner 1(r�d)
r1 = 0.0055; %yttre radie f�r ringen
r2 = 0.014; %Radie f�r ringen
m = 0.01866; %totala massan delat p� 3
d = 0.026; % ast�nd fr�n rotationsaxeln till mitten av en av bladens cirkel
R = 0.043; % radie fr�n rotationsaxel till l�ngst ut p� bladet.
J = 3*(  (m/2)*(r1^2 + r2^2) + m*(d^2)   );

%Definerar Kraft, Radie p� roterande ring och friktion
f = 10; %s�tter kraften till 20
b = 0.0000024; %friktion
d = 0.026; %radie fr�n rotationsaxeln

%defienerar parametrar som stegl�ngd och tidsintervall
t = 100;
y0 = 0;
h = 0.01;
t0 = 0;

[Angular_acceleration,Angular_position,Angular_speed]  = OurEuler(t0,h,t,J,f,b,d);

t = linspace(0,10,length(Angular_position));

plot(t,Angular_position);