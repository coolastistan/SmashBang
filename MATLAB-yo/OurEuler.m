function [A P W] = OurEuler( t0,h,tfinal, J,f,b,d )

    w = 0;
    p = 0;
    Index = 1;

    A = zeros(2000,1);
    P = zeros(2000,1);
    W = zeros(2000,1);
    % iteration från tiden noll till the end of time :O
    for t = t0 : h : tfinal 

        if(t > 1.6) % 0.119s är medelvärdet av den tid vi applicerar kraft
            f = 0;
        end

        a =(1/J) * (d*f - b*w) ;

        p = (p + (h*w));

        w = (w + (h*a));

        A(Index,1) = a;
        P(Index,1) = p;
        W(Index,1) = w;

        Index = Index + 1;

    end
end