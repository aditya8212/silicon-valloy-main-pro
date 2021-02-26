function spawnMissile(){
	if(frameCount%200 === 0){
		miss = createSprite(1200,random(50,450));
		miss.addImage(missile);
		miss.velocityX = -10;
		miss.scale = 0.3;
		//miss.debug = true

		miss.lifetime = 120;

		missileG.add(miss);

	}

}

function zapper(){
	if(frameCount%100 === 0){
		zapp = createSprite(1200,600);
		zapp.addImage(zapperimg);
		zapp.rotationSpeed = 10;
		zapp.velocityX = -10;
		zapp.scale = 0.4;
		zapperG.add(zapp);
		zapp.lifetime = 140

		if(john.y < 550){
			zapp.y = random(john.y-100,john.y+100);

		}
		else{
			zapp.y = john.y-170;

		}

	}

}