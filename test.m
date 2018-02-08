%% test

% Fidget spinner 1(r�d)
r1 = 0.0055; %yttre radie f�r ringen
r2 = 0.014; %Radie f�r ringen
m = 0.01866; %totala massan delat p� 3
d = 0.026; % ast�nd fr�n rotationsaxeln till mitten av en av bladens cirkel
R = 0.043; % radie fr�n rotationsaxel till l�ngst ut p� bladet.
J = 3*(  (m/2)*(r1^2 + r2^2) + m*(d^2)   );

%Definerar Kraft och friktion
f = 10; %input force
b = 0.0024; %friktion

w = 0;
Index = 1;

A = zeros(2000,1);
W = zeros(2000,1);
tfinal = 150;

%defienerar parametrar som stegl�ngd och tidsintervall
h = 0.03;
t0 = 0;
%%

for t = t0 : h : tfinal 
    
    if(t > 1.6) % 0.119s �r medelv�rdet av den tid vi applicerar kraft
        f = 0;
    end
    
    a =(1/J) * (R*f - b*w) ;
    w = w + (h*a);
    
    A(Index,1) = a;
    W(Index,1) = w;
    
    Index = Index + 1;
   
end

t = linspace(0,tfinal,length(W));

plot(t,W);
