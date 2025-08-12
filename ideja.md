# NAPRAVITI GOMILU SITNIH ZADATAKA KOJI TREBA DA SE URADE DA BI SE NANPRAVIO TETRIS.

## NANO BOARD

	- board koji se sastoji od jednog reda. (HTML, CSS Flex-grid)
	- shape je 1 monomino (mnmn) koji ne moze da izadje iz board-a
	- mnmn moze da se pomea levo desno, ali ne moze da izadje sa boarda.

## MIKRO BOARD

	- dodati vises redova u board
	- mnmn moze da se pomera i gore dole

## FIKSIRANJE MNMN-a

	- Kada kliknem space, da se fiksira mnmn
	- pokrece se novi mnmn

## PRAVLJENJE FULL LINIJE

	- Kada se fixira cela jedna linija ona nestaje.

--------------------------

Rotacija tetrominoa (tmn) zapravo znaci smena shape-a.

Ukupno ima 19 shape-a:
O 1 | I 2 | Z 2 | T 4 | S 2 | L 4 | J 4

Svaki shejp treba

BOARD:
[
	[. . . . .]
	[. . . . .]
	[. . . . .]
	[. . . . .]
	[. . . . .]
]

TETRAMINOS:
	T:
[
	[. T .]   [. T .]   [. . .]   [. T .]
	[T T T]   [. T T]   [T T T]   [T T .]
	[. . .]   [. T .]   [. T .]   [. T .]
]

	L:
[
	[. . L]   [. L .]   [. . .]   [L L .]
	[L L L]   [. L .]   [L L L]   [. L .]
	[. . .]   [. L L]   [L . .]   [. L .]
]

	I:
[
	[. . . .]  [. . I .]  [. . . .]  [. I . .]
	[I I I I]  [. . I .]  [. . . .]  [. I . .]
	[. . . .]  [. . I .]  [I I I I]  [. I . .]
	[. . . .]  [. . I .]  [. . . .]  [. I . .]
]

	O:
[
	[O O]
	[O O]
]





*/


