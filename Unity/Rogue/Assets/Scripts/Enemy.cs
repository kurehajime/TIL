using UnityEngine;
using System.Collections;

//Enemy inherits from MovingObject, our base class for objects that can move, Player also inherits from this.
public class Enemy : MovingObject
{
    public int playerDamage;                            //The amount of food points to subtract from the player when attacking.
    
    
    private Animator animator;                          //Variable of type Animator to store a reference to the enemy's Animator component.
    private Transform target;                           //Transform to attempt to move toward each turn.
    private bool skipMove;                              //Boolean to determine whether or not enemy should skip a turn or move this turn.
    
    
    //Start overrides the virtual Start function of the base class.
    protected override void Start ()
    {
        
        //初期化
        animator = GetComponent<Animator> ();
        
        //プレイヤーをターゲットに設定
        target = GameObject.FindGameObjectWithTag ("Player").transform;

        //GameManagerに紐づけ
        GameManager.instance.AddEnemyToList(this);

        base.Start ();
    }
    

    protected override void AttemptMove <T> (int xDir, int yDir)
    {
        //２回に１回スキップ
        if(skipMove)
        {
            skipMove = false;
            return;
        }
        
        base.AttemptMove <T> (xDir, yDir);
        
        skipMove = true;
    }
    
    
    //MoveEnemy is called by the GameManger each turn to tell each Enemy to try to move towards the player.
    public void MoveEnemy ()
    {
        int xDir = 0;
        int yDir = 0;

        // X軸が0ならY軸でぶらつく
        if(Mathf.Abs (target.position.x - transform.position.x) < float.Epsilon) {            
            yDir = target.position.y > transform.position.y ? 1 : -1;
        }
        else {
            xDir = target.position.x > transform.position.x ? 1 : -1;
        }
        AttemptMove <Player> (xDir, yDir);
    }
    
    
    //OnCantMove is called if Enemy attempts to move into a space occupied by a Player, it overrides the OnCantMove function of MovingObject 
    //and takes a generic parameter T which we use to pass in the component we expect to encounter, in this case Player
    protected override void OnCantMove <T> (T component)
    {
        //プレイヤーに衝突したらダメージを与える
        Player hitPlayer = component as Player;

        hitPlayer.LoseFood (playerDamage);
        
        animator.SetTrigger ("enemyAttack");

    }
}